"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userLogin_controller_1 = require("../controllers/userLogin.controller"); // Corrected import to include both functions from the controller
const appRoute = (0, express_1.Router)();
appRoute.get("/login", userLogin_controller_1.login_detail);
appRoute.post("/signup", userLogin_controller_1.signup_detail);
exports.default = appRoute;
