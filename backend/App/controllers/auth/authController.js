"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../../models');
const User = db.user;

 

// Login CLASS
class Auth {

    // Login User
    async login(req, res) {
        const { email, password } = req.body;
        if(!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if(!password) {
            return res.status(400).json({ message: "Password is required" });
        }



 
    }

    async register(req, res) {
        const { fullname , username, email, password, phone } = req.body;

        const existingUser = {
            $or : [
                { email: email },
                { username: username },
                { phone: phone }

            ]
        };
        const user = await User.findOne(existingUser);
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword,
            phone
        });

        try {
            const savedUser = await newUser.save();
            return res.status(201).json({ message: "User registered successfully", user: savedUser });
        } catch (error) {
            return res.status(500).json({ message: "Error registering user", error });
        }
    }
}


module.exports = new Auth();