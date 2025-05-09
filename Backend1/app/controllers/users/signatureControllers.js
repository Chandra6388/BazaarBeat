const db = require('../../models')
const SignatureDb = db.SignatureDb
const TemplatesDb = db.TemplatesDb;
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");



class Signature {
    async AddSignature(req, res) {
        const { details, Templates_Id, SignatureName, userId } = req.body;
        try {
            if (!details) {
                return res.send({ status: false, message: "details fields are required" });
            }
            if (!Templates_Id) {
                return res.send({ status: false, message: "Templates Id is required" });
            }
            if (!userId) {
                return res.send({ status: false, message: "User Id required" });
            }
            if (!SignatureName) {
                return res.send({ status: false, message: "Signature Name is required" });
            }

            const checkDuplicatesData = await SignatureDb.findOne({ SignatureName, userId });
            if (checkDuplicatesData) {
                return res.send({ status: false, message: "Signature name already exists" });
            }

            const newSignature = new SignatureDb({
                SignatureName,
                Templates_Id,
                userId,
                details
            });

            await newSignature.save();
            return res.send({ status: true, message: "Signature added successfully", data: newSignature });
        } catch (error) {
            return res.send({ status: false, message: "Internal server error", error: error });
        }
    }

    async updateSignature(req, res) {
        const { details, Templates_Id, SignatureName, id } = req.body;
        try {
            if (!id) {
                return res.send({ status: false, message: "Signature Id is required", data: [] });
            }
            if (!details) {
                return res.send({ status: false, message: "Personal Info is required", data: [] });
            }
            if (!Templates_Id) {
                return res.send({ status: false, message: "Templates id is required", data: [] });
            }
            if (!SignatureName) {
                return res.send({ status: false, message: "Signature Name is required", data: [] });
            }

            const checkIdExit = await SignatureDb.findById(id);

            if (!checkIdExit) {
                return res.send({ status: false, message: "Signature Id is incorrect", data: [] });
            }

            const existingSignature = await SignatureDb.findOne({ SignatureName, _id: { $ne: id } });
            if (existingSignature) {
                return res.send({ status: false, message: "Signature name already exists", data: [] });
            }

            const updatedSignature = await SignatureDb.findByIdAndUpdate(
                id,
                { SignatureName, Templates_Id, details },
                { new: true, runValidators: true }
            );

            return res.send({ status: true, message: "Signature updated successfully", data: updatedSignature });
        } catch (error) {
            return res.send({ status: false, message: "Internal server error", error: error });
        }
    }



    async getAllSignature(req, res) {
        const { userId } = req.body;
        try {
            const data = await SignatureDb.aggregate([
                {
                    $match: {
                        userId: new mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: "templates",
                        localField: "Templates_Id",
                        foreignField: "_id",
                        as: "templateInfo"
                    }
                },
                {
                    $unwind: {
                        path: "$templateInfo",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 1,
                        otherFieldsYouWantToKeep: 1,
                        Templates_Id: 1,
                        SignatureName: 1,
                        createdAt: 1,
                        usageCount: 1,
                        details: 1,
                        "templateInfo._id": 1,
                        "templateInfo.TemplatesName": 1
                    }
                }
            ]);

            if (data.length === 0) {
                return res.send({ status: true, message: "No signature found", data: [] });
            }

            return res.send({ status: true, message: "All signatures retrieved successfully", data: data });

        } catch (error) {
            console.log('Error:', error);
            res.send({ status: false, message: "Internal server error", error: error });
        }
    }

    async getSignatureById(req, res) {
        const { id } = req.body
        try {
            const data = await SignatureDb.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: 'templates',
                        localField: "Templates_Id",
                        foreignField: "_id",
                        as: "templateInfo"
                    }
                },
                {
                    $unwind: {
                        path: "$templateInfo",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 1,
                        otherFieldsYouWantToKeep: 1,
                        Templates_Id: 1,
                        SignatureName: 1,
                        createdAt: 1,
                        usageCount: 1,
                        details: 1,
                        "templateInfo._id": 1,
                        "templateInfo.TemplatesName": 1
                    }
                }
            ])

            if (data.length === 0) {
                return res.send({ status: true, message: "No signature found", data: [] });
            }

            return res.send({ status: true, message: "Signatures retrieved successfully", data: data });

        }
        catch (error) {
            console.log('Error:', error);
            res.send({ status: false, message: "Internal server error", error: error });
        }
    }

    async deleteSignature(req, res) {
        const { id } = req.body;

        try {
            if (!id) {
                return res.send({ status: false, message: "Id is required", data: [] });
            }

            await SignatureDb.findByIdAndDelete(id);
            return res.send({ status: true, message: "Signature deleted successfully", data: [] });

        } catch (error) {
            console.log("error", error);
            return res.send({ status: false, message: "Internal server error", error: error });
        }
    }
   
    async signatureSendByMails(req, res) {
        let { email, html } = req.body;
        const base64Match = html.match(/<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"/);
        const base64Data = base64Match ? base64Match[1] : null;
        html = html.replace(/<img src="https:\/\/loanofficersupport\.s3\.amazonaws\.com\/pimgs\/18140800618image_6809d9cce7e92\.png"[^>]*>/,
            `<img src="https://loanofficersupport.s3.amazonaws.com/pimgs/18140800618image_6809d9cce7e92.png" width="120" height="120" style="border-radius: 50%; border: 3px solid #64b5f6;" alt="Wade Warren" />`
        );
        const updatedHtml = base64Data ? html.replace(/<img[^>]+src="data:image\/[^;]+;base64,[^"]+"/, '<img src="cid:user-profile-img"') : html;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "chandra@eprimecomputers.com",
                pass: "gtor qsbe hlqu ladw", 
            },
        });

        console.log("updatedHtml", updatedHtml)
        const mailOptions = {
            from: "chandra@eprimecomputers.com",
            to: email,
            subject: "Your Signature Card",
            html: updatedHtml,
            attachments: base64Data
                ? [
                    {
                        filename: "profile.png",
                        content: base64Data,
                        encoding: "base64",
                        cid: "user-profile-img",
                    },
                ]
                : [],
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Email Error:", error);
                res.status(500).send({ status: false, message: "Failed to send email" });
            } else {
                res.send({
                    status: true,
                    message: "Signature sent to user successfully",
                });
            }
        });
    }
}

module.exports = new Signature();
