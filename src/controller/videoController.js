import video from "../models/video";

export const handleHome = async (req, res) =>{
    const videos = await video.find({})
    return res.render("home",{pageTitle: "home", videos:[]});
}  //res.render("view") , express가 views 디렉토리에서 그 이름의 pug파일을 찾음, render는 퍼그파일의 이름을 전해주는 것

export const watch = (req, res) => {
    const { id } = req.params; //주소의 id값
    return res.render("watch",{pageTitle: `Watching ${video.title}`});
} //base.pug에서 #{변수} => 각각의 컨트롤러에서 변수값을 보내 줄 수 있음

export const getEdit = (req, res) =>{
    const { id } = req.params;
    return res.render("edit",{pageTitle: `Edit ${video.title}`});
} 

export const postEdit = (req, res) =>{
    console.log(req.body);
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`); //redirect:설정한 주소로 다시 보냄
};

export const getUploadVideo = (req, res) =>{
    return res.render("upload", {pageTitle: `upload video`});
};

export const postUploadVideo = (req, res) => {
    // console.log("upload:::::",req.body)
    const {title} = req.body;
    return res.redirect("/");
}