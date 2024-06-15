import express from "express";
import { handleHome, search } from "../controller/videoController";
import { getJoin, postJoin, getLogin, postLogin, logout } from "../controller/userController";

const rootRouter = express.Router();

rootRouter.get("/", handleHome);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/logout",logout);
rootRouter.get("/search", search);

export default rootRouter;