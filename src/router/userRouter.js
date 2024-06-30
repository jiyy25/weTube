import express from "express";
import { remove, edit, see, logout, getLogin, startGithubLogin, finishGithubLogin, getEdit, postEdit, getChangePassword, postChangePassword } from "../controller/userController";
import { protectorMiddleware ,publicOnlyMiddleware} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/login",getLogin);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/editUser").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/remove", remove);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword)
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id(\\d+)", see);

export default userRouter;