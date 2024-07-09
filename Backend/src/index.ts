import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import defaultRoute from "./routes/defaultRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI  = process.env.MONGO_URI;

app.use(express.json());
app.use("", defaultRoute);

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}else{
  console.log("MONGO_URI is defined in the environment variables");

}

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
