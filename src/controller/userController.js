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
    const user = await User.findOne({username}); //findOne : 주어진 선택 기준과 일치하는 문서를 하나 찾아서 반환합니다
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
    return res.redirect("/");
};

export const edit = (req, res) => res.send("Edit user");
export const remove = (req, res) => res.send("remove user");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see user");
