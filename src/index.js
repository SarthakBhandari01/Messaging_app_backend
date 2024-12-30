import express from "express";
import { StatusCodes } from "http-status-codes";

import connectDB from "./config/dbConfig.js";
import transporter from "./config/mailConfig.js";
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routes/apiRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  return res.status(StatusCodes.OK).json({
    message: "pong",
  });
});

app.use("/api", apiRouter); //if the url starts with "/api" then the request is forwarded to apiRouter.

app.listen(PORT, async () => {
  console.log("server running on port ", PORT);
  connectDB();
  const mailResponse =await transporter.sendMail({
    from: "sarthakbhandri49@gmail.com",
    to: "sarthakbhandri49@gmail.com",
    subject: "Welcome mail",
    text: "Welcome to the app",
  });
  console.log(mailResponse);
});
