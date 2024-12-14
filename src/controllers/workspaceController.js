import { StatusCodes } from "http-status-codes";

import { createWorkspaceService } from "../services/workspaceService.js";
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse,
} from "../utils/common/responseObject.js";

export const createWorkspace = async (req, res) => {
  try {
    const response = await createWorkspaceService({
      ...req.body,
      owner: req.user,
    });
    res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, "Workspace created successfully"));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
