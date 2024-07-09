"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signup = exports.Login = void 0;
const mongoose_1 = require("mongoose");
const UserLoginSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Have some unique username"],
    },
    password: {
        type: String,
        required: true,
    },
});
const UserSignUpSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Have some unique username"],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
const Login = (0, mongoose_1.model)("Login", UserLoginSchema);
exports.Login = Login;
const Signup = (0, mongoose_1.model)("Signup", UserSignUpSchema);
exports.Signup = Signup;
