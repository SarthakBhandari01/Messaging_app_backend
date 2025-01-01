import express from "express";
import { createServer } from "http";
import { StatusCodes } from "http-status-codes";
import { Server } from "socket.io";

import connectDB from "./config/dbConfig.js";
import { PORT } from "./config/serverConfig.js";
import messageHandler from "./controllers/messageSocketController.js";
import apiRouter from "./routes/apiRouter.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  return res.status(StatusCodes.OK).json({
    message: "pong",
  });
});

app.use("/api", apiRouter); //if the url starts with "/api" then the request is forwarded to apiRouter.

io.on("connection", (socket) => {
  console.log("a user connected ", socket.id);
  messageHandler(io, socket);
});

server.listen(PORT, async () => {
  console.log("server running on port ", PORT);
  connectDB();
});
