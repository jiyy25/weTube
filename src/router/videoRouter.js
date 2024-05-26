import express from "express";
import { watch, remove, upload, getEdit, postEdit, getUploadVideo, postUploadVideo } from "../controller/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit); //get과 post함께 쓰는 방법
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);

videoRouter.get("/upload", getUploadVideo);
videoRouter.post("/upload", postUploadVideo);

export default videoRouter;
