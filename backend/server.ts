import dotenv from 'dotenv';
dotenv.config(); 

import express, { type Request, type Response } from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import rateLimit from "express-rate-limit";
import connectDB from './config/db.js'; 

connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

import authRoute from './routes/authRoute.js';
import documentRoutes from "./routes/document.route.js";

app.use('/api/auth', authRoute);
app.use("/api/documents", documentRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});