import { Router } from "express";
import { login_detail, signup_detail } from "../controllers/userLogin.controller"; // Corrected import to include both functions from the controller

const appRoute = Router();

appRoute.get("/login", login_detail);
appRoute.post("/signup", signup_detail); 

export default appRoute;