import express from "express";
import { protectedRoute } from "../middleWare/auth.middleware.js";
import {
  createMessage,
  getAllMessages,
  getAllUsersForChatList,
  openAiChat,
} from "../controller/message.controller.js";

const route = express.Router();

route.get("/users", protectedRoute, getAllUsersForChatList);
route.get("/:id", protectedRoute, getAllMessages);
route.post("/send/:id", protectedRoute, createMessage);
// route.post("/transcribe", transcribeText);
route.post("/ai", openAiChat);

export default route;
