import User from "../models/join";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"});
export const postJoin = async(req, res) => {
    console.log(req.body);
    const {email, username, password, password2,  name, location} = req.body;
    const pageTitle = "Join";

    const userExists = await User.exists({$or : [{email} , {username}]}); //이메일과 username 중복체크 $or
    if(userExists){
        return res.status(400).render("join",{
            pageTitle,
            errorMessage : "This user-name/ user-email is already taken."
        });
    }

    if(password !== password2){
        return res.status(400).render("join", {
            pageTitle,
            errorMessage : "비밀번호 노 일치"
        })
    }

    try{
        await User.create({
            email,
            username,
            password,
            name,
            location,
        })
        return res.redirect("/login");
    }catch(error){
        console.log("데이터를 가져오지 못했다.");
        return res.statue(400).render("join",{
            pageTitle,
            errorMessage : error._message,
        })
    }
    }

export const getLogin = (req, res) => res.render("login", {pageTitle:"Login"});

export const postLogin = async(req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username, socialOnly : false}); //findOne : 주어진 선택 기준과 일치하는 문서를 하나 찾아서 반환합니다
    if(!user){
        return res.status(400).render("login",{
            pageTitle: "Login",
            errorMessage: "아이디가 일치하지 않아요",
        });
    }
    console.log(user)
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", {
            pageTitle: "Login",
            errorMessage: "비밀번호가 일치하지 않아요",
        })
    }
    req.session.loggedIn = true;
    req.session.user = user;  //세션에 loggdIn과 user 정보를 추가
    return res.redirect("/");
};
export const startGithubLogin = (req, res) =>{
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id : process.env.GH_CLIENT,
        allow_signup : false,
        scope : "read:user user:email",
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;

    return res.redirect(finalUrl);
}

export const finishGithubLogin = async(req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id : process.env.GH_CLIENT,
        client_secret : process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await ( 
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
        },
    })
    ).json();
    // console.log(json);
    // res.send(JSON.stringify(json));

    if("access_token" in tokenRequest) {
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com"
        const userData = await(
            await fetch(`${apiUrl}/user`,{
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        console.log(userData);

        const emaliData = await(
            await fetch(`${apiUrl}/user/emails`,{
                headers:{
                    Authorization: `token ${access_token}`
                },
            })
        ).json();
        // console.log(emaliData)

        const emailObj = emaliData.find(email => email.primary == true && email.verified == true);
        console.log(emailObj);

        if(!emailObj){
            return res.redirect("/login");
        }

        let user = await User.findOne({email: emailObj.email});
        if(!user){
            user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly: true,
                location: userData.location,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");

    }else{
        return res.redirect("/login");
    }
}

export const logout = (req, res) =>{
    req.session.destroy(); //로그아웃
    return res.redirect("/");
};

export const getEdit = (req, res) => {
    return res.render("editUser", {pageTitle : "Edit Profile"});
};

export const postEdit = (req, res) => {
    return res.render("editUser");
};

export const remove = (req, res) => res.send("remove user");
export const see = (req, res) => res.send("see user");
