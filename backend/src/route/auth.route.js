import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controller/auth.controller.js";
import { protectedRoute } from "../middleWare/auth.middleware.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.post("/logout", logout);
route.post("/update-profile", protectedRoute, updateProfile);
route.get("/check", protectedRoute, checkAuth);

export default route;
