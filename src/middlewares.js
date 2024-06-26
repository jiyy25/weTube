export const localsMiddleware = (req, res, next) =>{
    res.locals.loggedIn = Boolean(req.session.loggedIn); 
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {}; 
    console.log(res.locals);
    next();
}

//locals는 자동적으로 views로 import됨

//로그인이 되있으면 계속 진행 , 아니면 /login 페이지로
export const protectorMiddleware = (req, res, next) =>{
    if(req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/login");
    }
};

//로그인 되어있지 않는 사람만 접근할 수 있는 미들웨어
//예를 들어 내가 로그인했는데, 또 로그인페이지를 갈수 있으면 안되기때문..!
export const publicOnlyMiddleware = (req, res, next) =>{
    if(!req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/");
    }
}