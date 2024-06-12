export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"});
export const PostJoin = (req, res) => {
    console.log(req.body);
    res.end();
}
export const edit = (req, res) => res.send("Edit user");
export const remove = (req, res) => res.send("remove user");
export const login = (req, res) => res.send("login");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("see user");
