import { StatusCodes } from "http-status-codes";

import { getMessagesService } from "../services/messageService.js";
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse,
} from "../utils/common/responseObject.js";

export const getMessages = async (req, res) => {
  try {
    const response = await getMessagesService(
      { channelId: req.params.channelId },
      req.query.page || 1,
      req.query.limit || 20,
      req.user
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, "Fetched messages successfully"));
  } catch (error) {
    console.log("Get Messages controller error ", error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
