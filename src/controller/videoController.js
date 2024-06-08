import Video from "../models/video";

export const handleHome = async (req, res) =>{
    const videos = await Video.find({})
    return res.render("home",{pageTitle: "home", videos});
}  //res.render("view") , express가 views 디렉토리에서 그 이름의 pug파일을 찾음, render는 퍼그파일의 이름을 전해주는 것

export const watch = async(req, res) => {
    const { id } = req.params; //주소의 id값
    const video = await Video.findById(id); //mongoose가 부여한 id값을 사용할 수 있게함.
    console.log(video);
    return res.render("watch",{pageTitle: video.title ,video});
} //base.pug에서 #{변수} => 각각의 컨트롤러에서 변수값을 보내 줄 수 있음

export const getEdit = (req, res) =>{
    const { id } = req.params;
    return res.render("edit",{pageTitle: `Edit ${Video.title}`});
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

export const postUploadVideo = async(req, res) => {
    const {title, description, createAt, hashtags, meta } = req.body;
    try{
        await Video.create({
            title,
            description,
            hashtags: hashtags.split(",").map(hash=> `#${hash}`),
        })
        return res.redirect("/");
    } catch (error){
        console.log(error);
        return res.render("upload", {pageTitle: `upload video`, errorMessage :error._message});

    }
    //try, catch문으로 에러가 일어났을 때 업로드페이지로 보내줌, 에러메세지 보여줌.
    
};