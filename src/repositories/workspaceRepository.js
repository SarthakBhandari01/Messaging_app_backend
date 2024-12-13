import Workspace from "../schema/workSpace.js";
import crudRepository from "./crudRepository.js";

const workspaceRepository = {
  ...crudRepository(Workspace),
  getWorkspaceByName: async function () {},
  getWorkspaceByJoinCode: async function () {},
  addMemberToWorkspace: async function () {},
  addChannelToWorkspace: async function () {},
  findAllWorkspaceBYMemberId: async function () {},
};
