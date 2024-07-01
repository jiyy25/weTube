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

export const postEdit = async(req, res) => {
    const {
        session :{
            user:{_id, username:currentUserName, email: currentEmail , avatarUrl},
        },
        body:{name, email, username, location},
        file, //multer
    } = req;
    console.log(file);

    //username이 db에 이미 있다면?
    const pageTitle = "Edit Profile";

    if(username !== currentUserName){
        const userNameExists = await User.exists({username});
        if(userNameExists){
            return res.status(400).render("editUser",{
                pageTitle,
                errorMessage : "사용자 이름이 이미 존재합니다.",
            });
        }
    }

    if(email !== currentEmail){
        const userEmailExist = await User.exists({email});
        if(userEmailExist){
            return res.render("editUser",{
                pageTitle,
                errorMessage: "사용자 이메일이 이미 존재합니다."
            })
        }
    }

    const updateUser = await User.findByIdAndUpdate(_id, {
        avatarUrl: file ? file.path : avatarUrl, //파일을 업로드 하지 않을때
        name,
        email,
        username,
        location,
    },
    {new : true}, // 이걸 설정해주면 findByIdAndUpdate가 업데이트 된 데이터를 리턴해준다...!
);
    req.session.user = updateUser;
    return res.redirect("/user/editUser");
};

export const getChangePassword = (req, res)=>{
    if(req.session.user.socialOnly === true){
        return res.redirect("/");
    }
    return res.render("users/changePassword", {pageTitle : "Change Password"})
}

export const postChangePassword = async (req, res)=>{
    const {
        session:{
            user:{_id},
        },
        body:{oldPassWord,
            newPassWord,
            newPassWordConfirm
        }
    } = req;
    
    const user = await User.findById(_id);
    const ok = await bcrypt.compare(oldPassWord, user.password);
    if(!ok){
        return res.status(400).render("users/changePassword", {
            pageTitle: "Change Password",
            errorMessage: "기존 비밀번호가 일치하지 않습니다."
        })
    }
    if(newPassWord !== newPassWordConfirm ){
        return res.status(400).render("users/changePassword", {
            pageTitle: "Change Password",
            errorMessage: "새 비밀번호가 일치하지 않습니다."
        })
    }

    //최종성공
    user.password = newPassWord;
    await user.save();
    return res.redirect("/user/logout");

}

export const remove = (req, res) => res.send("remove user");
export const see = (req, res) => res.send("see user");
