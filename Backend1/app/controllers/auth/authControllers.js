const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../../models');
const UserDb = db.UserDb;
const moment = require("moment");
const nodemailer = require("nodemailer");

const getDateRange = (filterType, startDate, endDate) => {
    let currentStart, currentEnd, previousStart, previousEnd;

    switch (filterType) {
        case "today":
            currentStart = moment().utc().startOf("day");
            currentEnd = moment().utc().endOf("day");
            previousStart = moment().utc().subtract(1, "day").startOf("day");
            previousEnd = moment().utc().subtract(1, "day").endOf("day");
            break;

        case "this_week":
            currentStart = moment().utc().startOf("week");
            currentEnd = moment().utc().endOf("week");
            previousStart = moment().utc().subtract(1, "week").startOf("week");
            previousEnd = moment().utc().subtract(1, "week").endOf("week");
            break;

        case "this_month":
            currentStart = moment().utc().startOf("month");
            currentEnd = moment().utc().endOf("month");
            previousStart = moment().utc().subtract(1, "month").startOf("month");
            previousEnd = moment().utc().subtract(1, "month").endOf("month");
            break;

        case "this_year":
            currentStart = moment().utc().startOf("year");
            currentEnd = moment().utc().endOf("year");
            previousStart = moment().utc().subtract(1, "year").startOf("year");
            previousEnd = moment().utc().subtract(1, "year").endOf("year");
            break;

        case "custom":
            if (!startDate || !endDate) return {};
            currentStart = moment.utc(startDate);
            currentEnd = moment.utc(endDate).endOf("day");
            const diff = currentEnd.diff(currentStart);
            previousStart = moment.utc(startDate).subtract(diff, "milliseconds");
            previousEnd = moment.utc(endDate).subtract(diff, "milliseconds");
            break;

        default:
            return {};
    }

    return {
        current: { $gte: currentStart.toDate(), $lte: currentEnd.toDate() },
        previous: { $gte: previousStart.toDate(), $lte: previousEnd.toDate() },
    };
};

const getPercentChange = (current, previous) => {
    if (previous === 0) return current === 0 ? 0 : 100;
    return parseFloat(((current - previous) / previous) * 100).toFixed(2);
};


class Auth {
    async login(req, res) {
        const { Email, Password } = req.body;
        if (!Email) {
            return res.send({ status: false, message: "Email is required" });
        }
        if (!Password) {
            return res.send({ status: false, message: "Password is required" });
        }


        const user = await UserDb.findOne({ Email: Email });



        if (!user) {
            return res.send({ status: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(Password, user?.Password);
        if (!isMatch) {
            return res.send({ status: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user?._id }, process.env.SECRET, { expiresIn: "1h" });
        const { password: _, ...userWithoutPassword } = user.toObject();


        return res.send({
            status: true,
            message: "Login successful",
            user: userWithoutPassword,
            token: token,
            expiresIn: 3600
        });


    }
    async register(req, res) {
        const { FirstName, LastName, Username, Email, PhoneNo, Password } = req.body;


        const existingUser = {
            $or: [
                { Email: Email },
                { Username: Username },
                { PhoneNo: PhoneNo }

            ]
        };
        const user = await UserDb.findOne(existingUser);
        if (user) {
            return res.send({ status: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = new UserDb({
            FirstName,
            LastName,
            Username,
            Email,
            Password: hashedPassword,
            PhoneNo
        });

        try {
            const savedUser = await newUser.save();
            return res.send({ status: true, message: "User registered successfully", user: savedUser });
        } catch (error) {
            return res.send({ status: false, message: "Error registering user", error });
        }
    }

    async getAllUser(req, res) {
        try {
            const { filter_type, start_date, end_date } = req.body;

            const ranges = getDateRange(filter_type, start_date, end_date);

            if (!ranges.current || !ranges.previous) {
                return res.send({ status: false, message: "Invalid filter_type or date range." });
            }

            const currentFilter = { createdAt: ranges.current };
            const previousFilter = { createdAt: ranges.previous };

            // Debug: Log ranges
            console.log("Current Filter Range:", currentFilter);
            console.log("Previous Filter Range:", previousFilter);

            // ✅ Get users only in current range
            const data = await UserDb.find(currentFilter).sort({ createdAt: -1 });

            // 🔢 Count current users
            const total_user = data.length;
            const total_active_user = await UserDb.countDocuments({ ...currentFilter, Is_Active: "1" });
            const total_inactive_user = total_user - total_active_user;

            // 🔢 Count previous users
            const prev_total_user = await UserDb.countDocuments(previousFilter);
            const prev_total_active_user = await UserDb.countDocuments({ ...previousFilter, Is_Active: "1" });
            const prev_total_inactive_user = prev_total_user - prev_total_active_user;

            res.send({
                status: true,
                message: "User stats fetched successfully.",
                data,
                current: {
                    total_user,
                    total_active_user,
                    total_inactive_user
                },
                previous: {
                    total_user: prev_total_user,
                    total_active_user: prev_total_active_user,
                    total_inactive_user: prev_total_inactive_user
                },
                percentage_change: {
                    total_user: getPercentChange(total_user, prev_total_user),
                    total_active_user: getPercentChange(total_active_user, prev_total_active_user),
                    total_inactive_user: getPercentChange(total_inactive_user, prev_total_inactive_user)
                }
            });

        } catch (error) {
            console.error("Error in getAllUserStats:", error);
            res.send({ status: false, message: "Internal Server Error", error });
        }
    }

    async updateProfileImg(req, res) {
        const { id, url } = req.body;
        try {
            if (!id) {
                return res.send({ status: false, message: "User ID is required", data: [] });
            }

            if (!url) {
                return res.send({ status: false, message: "Please upload a profile image", data: [] });
            }

            const user = await UserDb.findById(id);

            if (!user) {
                return res.send({ status: false, message: "User not found", data: [] });
            }

            await UserDb.findByIdAndUpdate(id, { profile_img: url });

            return res.send({ status: true, message: "Profile updated successfully", data: [] });
        } catch (error) {
            return res.send({ status: false, message: "Internal server error", error });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.body;

            if (!id) {
                return res.send({ status: false, message: "User ID is required", data: [], });
            }

            const data = await UserDb.findById({ _id: id });

            if (!data) {
                return res.send({ status: false, message: "User not found", data: [], });
            }

            return res.send({ status: true, message: "User retrieved successfully", data: data, });
        } catch (error) {
            console.error("Error in getUserById:", error);
            return res.send({ status: false, message: "Internal server error", error: error.message, });
        }
    }

    async forgotPassword(req, res) {
        const { Username, Email } = req.body;

        if (!Username || !Email) {
            return res.send({ status: false, message: "ID and Email are required." });
        }

        const user = await UserDb.findOne({ Username, Email });

        if (!user) {
            return res.send({ status: false, message: "User not found." });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1m' });

        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes expiry
        await user.save();

        const resetLink = `http://localhost:8080/reset-password`;
        const html = `
            <h2>Hello ${user.FirstName || "User"},</h2>
            <p>You requested to reset your password.</p>
            <p><a href="${resetLink}" target="_blank">Click here to reset your password</a></p>
            <p>This link will expire in 15 minutes.</p>
        `;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "cppatel6388@gmail.com",
                pass: "pyei rnqf mlrg ojzt",
            },
        });

        const mailOptions = {
            from: "cppatel6388@gmail.com",
            to: user.Email,
            subject: "Reset Your Password",
            html: html,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            res.send({ status: true, message: "Reset link sent to email.", token: token });
        } catch (error) {
            console.error("Email Error:", error); // Logs the error message
            res.send({ status: false, msg: "Failed to send email.", error: error });
        }
    }

    async resetPassword(req, res) {
        const { newPassword, token } = req.body;

        if (!newPassword) {
            return res.send({ status: false, message: "New password is required." });
        }
        if (!token) {
            return res.send({ status: false, message: "Token is required." });
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET);

            const user = await UserDb.findById(decoded.id);
            if (!user) {
                return res.send({ status: false, message: "User not found." });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updatedUser = await UserDb.findOneAndUpdate({ _id: decoded.id }, { Password: hashedPassword }, { new: true });
            if (!updatedUser) {
                return res.send({ status: false, message: "Failed to update password." });
            }
            return res.send({ status: true, message: "Password reset successfully." });

        }
        catch (error) {
            console.error("Error in resetPassword:", error);

            if (error.name === "TokenExpiredError") {
                return res.send({ status: false, message: "Token has expired.", expiredAt: error.expiredAt });
            }

            return res.send({ status: false, message: "Internal server error", error: error.message });
        }
    }



}


module.exports = new Auth();