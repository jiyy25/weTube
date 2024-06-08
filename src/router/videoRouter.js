import express from "express";
import { watch, remove, upload, getEdit, postEdit, getUploadVideo, postUploadVideo } from "../controller/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch); //mongodb의 id값을 맞춰줌-> mongodb는 objectId를 2햐4바이트 16진 문자열 표현으로 반환
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit); //get과 post함께 쓰는 방법
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);

videoRouter.get("/upload", getUploadVideo);
videoRouter.post("/upload", postUploadVideo);

export default videoRouter;
