import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import Razorpay from "razorpay";
import cors from 'cors'

dotenv.config();

export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret,
});

const app = express();
// using middlewares

app.use(express.json());
app.use(cors());

const port = process.env.PORT;


app.get('/', (req, res) => {
    res.send("Hello World");
});
app.use("/uploads", express.static("uploads"));

// importing routers

import userRoutes from "./routes/user.js";
import createRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";
// using routes
app.use("/api", userRoutes);
app.use("/api", createRoutes);
app.use("/api", adminRoutes);

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
    connectDb();
});