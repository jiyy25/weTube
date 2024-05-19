import express from "express";
import morgan from "morgan";

import globalRouter from "../router/globalRouter";
import userRouter from "../router/userRouter";
import videoRouter from "../router/videoRouter";

const PORT = 4000;

const app = express();

const logger = morgan("dev");
app.use(logger);

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

app.listen(PORT, () => { console.log(`server listening on port http://localhost:${PORT} !!`) });
