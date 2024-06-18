import express from "express";
import { remove, edit, see, logout, getLogin, startGithubLogin, finishGithubLogin } from "../controller/userController";


const userRouter = express.Router();

userRouter.get("/login",getLogin);
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/:id(\\d+)", see);

export default userRouter;