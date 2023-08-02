import * as dotenv from "dotenv";
import bodyParser from 'body-parser';
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); //For JSON requests
app.use(express.urlencoded({ extended: true })); //Instead of body parser

import apiRouter from "./routes/api/apiRoutes.js";

app.use("/api", apiRouter);

app.post('/contact', (req,res) => {
  const { name, email, message } = req.body;
  res.send('Form submitted successfully!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
