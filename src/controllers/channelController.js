import { StatusCodes } from "http-status-codes";

import { getChannelByIdService } from "../services/channelService.js";
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse,
} from "../utils/common/responseObject.js";

export const getChannelByIdController = async (req, res) => {
  try {
    const channel = await getChannelByIdService(req.params.channelId, req.user);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(channel, "Channel fetched successfully"));
  } catch (error) {
    console.log("get channel by id controller error ", error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
