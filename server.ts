import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json()); //For JSON requests
app.use(express.urlencoded({ extended: true })); //Instead of body parser

import apiRouter from "./routes/api/apiRoutes.js";

app.use("/api", apiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
