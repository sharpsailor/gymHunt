import { Request, Response, NextFunction } from "express";
import { Login, Signup } from "../models/user.models";
import bcrypt from "bcrypt";
// import { Signup } from "../models/user.models";
// Checking User Login Details
export const login_detail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    const user = await Signup.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Username not found" });
    }
    // Checking Password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // Login Successfully
    return res.status(200).json({ message: "Login Successfully" });
  } catch (e) {
    console.log((e as Error).message);
  }
};

export const signup_detail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    // Validating User
    const validateEmail = (email: string) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
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
    const user = await Signup.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const emaildetails = await Signup.findOne({ email });
    if (emaildetails) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new Signup({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "User Created Successfully" });
  } catch (e) {
    console.log((e as Error).message);
  }
};
// export default {login_detail,signup_detail};
