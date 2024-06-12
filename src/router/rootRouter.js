import express from "express";
import { handleHome, search } from "../controller/videoController";
import { getJoin, PostJoin, login, logout } from "../controller/userController";

const rootRouter = express.Router();

rootRouter.get("/", handleHome);
rootRouter.route("/join").get(getJoin).post(PostJoin);
rootRouter.get("/login", login);
rootRouter.get("/logout",logout);
rootRouter.get("/search", search);

export default rootRouter;