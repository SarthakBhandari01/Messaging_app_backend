import { createMessageService } from "../services/messageService.js";
import {
  NEW_MESSAGE_EVENT,
  NEW_MESSAGE_RECEIVED_EVENT,
} from "../utils/common/eventConstant.js";

export default function messageHandler(io, socket) {
  socket.on(NEW_MESSAGE_EVENT, async function (data, cb) {
    const messageResponse=await createMessageService(data);
    socket.broadcast.emit(NEW_MESSAGE_RECEIVED_EVENT, messageResponse);
    cb({
      status: "Data sent successfully",
    });
  });
}
