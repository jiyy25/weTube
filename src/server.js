import express from "express";
import morgan from "morgan";

import globalRouter from "./router/globalRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); //express의 app.set기능 중 view-engine을 pug로 설정
app.set("views", process.cwd() + "/src/views"); //뷰의 시작경로 바꿔주기
app.use(logger);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

app.listen(PORT, () => { console.log(`server listening on port http://localhost:${PORT} !!`) });
