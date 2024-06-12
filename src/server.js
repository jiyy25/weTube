import express from "express";
import morgan from "morgan";

import rootRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); //express의 app.set기능 중 view-engine을 pug로 설정
app.set("views", process.cwd() + "/src/views"); //뷰의 시작경로 바꿔주기
app.use(logger);
app.use(express.urlencoded({extended:true})); //form 의 body를 이해해서 우리가 쓸 수 있는 멋진 자바스크립트 형식으로 변형시켜줄 수 있다.
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

export default app;