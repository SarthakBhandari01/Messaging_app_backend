import express from "express";

import channelRouter from "./channel.js";
import memberRouter from "./member.js";
import messageRouter from "./message.js"
import userRouter from "./user.js";
import workspaceRouter from "./workspaceRoute.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/workspaces", workspaceRouter);
router.use("/channels", channelRouter);
router.use("/members", memberRouter);
router.use("/messages",messageRouter);

export default router;
