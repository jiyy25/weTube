import express from "express";
import { remove, edit, see, logout, getLogin, startGithubLogin, finishGithubLogin, getEdit, postEdit, getChangePassword, postChangePassword } from "../controller/userController";
import { protectorMiddleware ,publicOnlyMiddleware, uploadFiles} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/login",getLogin);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/editUser").all(protectorMiddleware).get(getEdit).post(uploadFiles.single("avatar"), postEdit); //이름이 avatar인 단일 파일을 수락(이름은 formd의 name과 같아야 함)
userRouter.get("/remove", remove);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword)
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id(\\d+)", see);

export default userRouter;