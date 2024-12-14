import express from "express";

import { createWorkspace } from "../../controllers/workspaceController.js";
import { isAuthenticated } from "../../middleware/authMiddleware.js";
import { workspaceSchema } from "../../validators/workspaceSchema.js";
import { validate } from "../../validators/zodValidator.js";

const router = express.Router();

router.post("/", validate(workspaceSchema), isAuthenticated, createWorkspace);

export default router;
