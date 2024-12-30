import express from "express";

import channelRouter from "./channel.js";
import userRouter from "./user.js";
import workspaceRouter from "./workspaceRoute.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/workspace", workspaceRouter);
router.use("/channels", channelRouter);

export default router;
