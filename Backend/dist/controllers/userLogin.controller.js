"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup_detail = exports.login_detail = void 0;
const user_models_1 = require("../models/user.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
// import { Signup } from "../models/user.models";
// Checking User Login Details
const login_detail = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        // Validating User
        if (!username) {
            return res.status(400).json({ message: "Please enter username" });
        }
        if (!password) {
            return res.status(400).json({ message: "Please enter password" });
        }
        // Finding Username in database
        const user = await user_models_1.Signup.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Username not found" });
        }
        // Checking Password
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        // Login Successfully
        return res.status(200).json({ message: "Login Successfully" });
    }
    catch (e) {
        console.log(e.message);
    }
};
exports.login_detail = login_detail;
const signup_detail = async (req, res, next) => {
    try {
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        // Validating User
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        };
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Please enter valid email" });
        }
        if (!email) {
            return res.status(400).json({ message: "Please enter email " });
        }
        if (!username) {
            return res.status(400).json({ message: "Please enter username" });
        }
        if (!password) {
            return res.status(400).json({ message: "Please enter  password" });
        }
        if (!confirmPassword) {
            return res.status(400).json({ message: "Please enter Confirm Password" });
        }
        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ message: "Password and Confirm Password should be same" });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password should be atleast 6 characters" });
        }
        const user = await user_models_1.Signup.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const emaildetails = await user_models_1.Signup.findOne({ email });
        if (emaildetails) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const newUser = new user_models_1.Signup({
            email,
            username,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(200).json({ message: "User Created Successfully" });
    }
    catch (e) {
        console.log(e.message);
    }
};
exports.signup_detail = signup_detail;
// export default {login_detail,signup_detail};
