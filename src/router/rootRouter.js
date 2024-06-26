import express from "express";
import { handleHome, search } from "../controller/videoController";
import { getJoin, postJoin, getLogin, postLogin, logout } from "../controller/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", handleHome);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/logout",logout);
rootRouter.get("/search", search);

export default rootRouter;