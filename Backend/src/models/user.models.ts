import mongoose, { model, Schema } from "mongoose";

interface IUser {
  username: string;
  password: string;
}

interface IUserSignUp extends IUser {
  email: string;
}

const UserLoginSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Have some unique username"],
  },
  password: {
    type: String,
    required: true,
  },
});

const UserSignUpSchema = new Schema<IUserSignUp>({
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

const Login = model<IUser>("Login", UserLoginSchema);
const Signup = model<IUserSignUp>("Signup", UserSignUpSchema);

export { Login, Signup };
