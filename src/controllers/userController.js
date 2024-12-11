import { StatusCodes } from "http-status-codes";

import { signUpService } from "../services/userService.js";
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse,
} from "../utils/common/responseObject.js";

export const signUp = async (req, res) => {
  try {
    const response = await signUpService(req.body);

    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, "User created successfully"));
  } catch (error) {
    console.log("User controler error ", error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
