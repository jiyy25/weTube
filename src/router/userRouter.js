import express from "express";
import { remove, edit, see, logout, login } from "../controller/userController";


const userRouter = express.Router();

userRouter.get("/login",login);
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/:id(\\d+)", see);

export default userRouter;