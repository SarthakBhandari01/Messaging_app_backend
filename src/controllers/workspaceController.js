import { StatusCodes } from "http-status-codes";

import {
  createWorkspaceService,
  deleteWorkspaceService,
  getAllWorkspacesUserIsMemberOfService,
} from "../services/workspaceService.js";
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

export const getAllWorkspacesUserIsMemberOf = async (req, res) => {
  try {
    const response = await getAllWorkspacesUserIsMemberOfService(req.user);
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(response, "Fetched all the workspaces successfully")
      );
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};

export const deleteWorkspace = async (req, res) => {
  try {
    const workspaceId = req.params.workspaceId;
    const userId = req.user;

    const response = await deleteWorkspaceService(workspaceId, userId);

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, "Workspace Successfully deleted"));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
