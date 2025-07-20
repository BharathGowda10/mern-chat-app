import express from "express";
import { protectedRoute } from "../middleWare/auth.middleware.js";
import { createMessage, getAllMessages, getAllUsersForChatList } from "../controller/message.controller.js";

const route = express.Router();

route.get("/users", protectedRoute, getAllUsersForChatList);
route.get("/:id", protectedRoute, getAllMessages);
route.post("/send/:id", protectedRoute, createMessage);

export default route;
