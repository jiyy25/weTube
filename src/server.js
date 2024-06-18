import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); //express의 app.set기능 중 view-engine을 pug로 설정
app.set("views", process.cwd() + "/src/views"); //뷰의 시작경로 바꿔주기
app.use(logger);
app.use(express.urlencoded({extended:true})); //form 의 body를 이해해서 우리가 쓸 수 있는 멋진 자바스크립트 형식으로 변형시켜줄 수 있다.

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store : MongoStore.create({mongoUrl:process.env.DB_URL}), //세션스토어를 통해 db에 세션값을 넣어줌. 이렇게 하면 db가 세션id를 기억할 수 있다.
    })
);

// app.use((req, res, next) =>{
//     req.sessionStore.all((error, sessions)=>{
//         console.log(sessions);
//         next();
//     });
// })

// app.get("/add-one", (req, res, next) => {
//     req.session.potato += 1;
//     return res.send(`${req.session.id} ${req.session.potato}`);
//     });

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

export default app;