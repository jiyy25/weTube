export const handleHome = (req, res) => res.send("home");
export const watch = (req, res) => {
    console.log(req.params);
    return res.send(`watch video #${req.params.id}`);
}
export const edit = (req, res) => res.send("Edit video");
export const remove = (req, res) => res.send("Delete Video");
export const upload = (req, res) => res.send("upload Video");
export const search = (req, res) => res.send("search Video");