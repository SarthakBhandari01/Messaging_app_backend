import { StatusCodes } from "http-status-codes";
import uuid4 from "uuid4";

import channelRepository from "../repositories/channelRepository.js";
import workspaceRepository from "../repositories/workspaceRepository.js";
import ClientError from "../utils/errors/clientError.js";
import validationError from "../utils/errors/validationError.js";

export const createWorkspaceService = async (workspaceData) => {
  try {
    const joinCode = uuid4().substring(0, 6).toUpperCase();
    const workspace = await workspaceRepository.create({
      name: workspaceData.name,
      description: workspaceData.description,
      joinCode,
      members: [],
      channels: [],
    });
    //add owner
    await workspaceRepository.addMemberToWorkspace(
      workspace._id,
      workspaceData.owner,
      "admin"
    );

    //add channel
    const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(
      workspace._id,
      "general"
    );

    return updatedWorkspace;
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new validationError({ error: error.errors }, error.message);
    }

    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new validationError(
        {
          error: ["Workspace with same name already exists"],
        },
        "Workspace with same name already exists"
      );
    }

    throw error;
  }
};

export const getAllWorkspacesUserIsMemberOfService = async (userId) => {
  try {
    const workspaces = await workspaceRepository.findAllWorkspaceByMemberId(
      userId
    );
    return workspaces;
  } catch (error) {
    console.log(" Get workspace user is member service error ", error);
    throw error;
  }
};

export const deleteWorkspaceService = async (workspaceId, userId) => {
  try {
    const workspace = await workspaceRepository.getById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        message: "Invalid data sent from the client",
        explaination: " Workspace not found",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    const isAllowed = workspace.members.find((member) => {
      console.log(typeof member.memberId);
      console.log(typeof userId);
      return member.memberId.toString() === userId && member.role === "admin";
    });
    if (isAllowed) {
      await channelRepository.deleteMany(workspace.channels);

      const response = await workspaceRepository.delete(workspaceId);
      return response;
    }

    throw new ClientError({
      message: "User is not allowed to delete the workspace ",
      explaination: "Invalid data sent from the client ",
      statusCode: StatusCodes.UNAUTHORIZED,
    });
  } catch (error) {
    console.log("Delete workspace service  error ", error);
    throw error;
  }
};
