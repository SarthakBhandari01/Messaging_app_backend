import uuid4 from "uuid4";

// import channelRepository from "../repositories/channelRepository.js";
import workspaceRepository from "../repositories/workspaceRepository.js";
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

// export const addMemberToWorkspaceService = async (
//   workspaceId,
//   memberId,
//   role
// ) => {
//   try {
//     const workspace = await workspaceRepository.addMemberToWorkspace(
//       workspaceId,
//       memberId,
//       role
//     );
//     return workspace;
//   } catch (error) {
//     throw error;
//   }
// };

// export const createChannelService = async (workspaceId, channelName) => {
//   try {
//     const channel = await channelRepository.create({ name: channelName });
//     return channel;
//   } catch (error) {
//     throw error;
//   }
// };
