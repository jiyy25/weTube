import User from "../models/join";

export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"});
export const PostJoin = async(req, res) => {
    console.log(req.body);
    const {email, username, password, name, location} = req.body;
    await User.create({
        email,
        username,
        password,
        name,
        location,
    })
    return res.redirect("/login");
}
export const edit = (req, res) => res.send("Edit user");
export const remove = (req, res) => res.send("remove user");
export const login = (req, res) => res.send("login");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see user");
