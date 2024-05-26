import express from "express";
import { handleHome, search } from "../controller/videoController";
import { join, login, logout } from "../controller/userController";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/logout",logout);

export default globalRouter;