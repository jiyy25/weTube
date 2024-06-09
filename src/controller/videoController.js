import Video from "../models/video";

export const handleHome = async (req, res) =>{
    const videos = await Video.find({})
    return res.render("home",{pageTitle: "home", videos});
}  //res.render("view") , express가 views 디렉토리에서 그 이름의 pug파일을 찾음, render는 퍼그파일의 이름을 전해주는 것

export const watch = async(req, res) => {
    const { id } = req.params; //주소의 id값
    const video = await Video.findById(id); //mongoose가 부여한 id값을 사용할 수 있게함.
    console.log(video);
    if(!video){
        return res.render("404",{pageTitle: "Video not found."})
    }
    return res.render("watch",{pageTitle: video.title ,video});
} //base.pug에서 #{변수} => 각각의 컨트롤러에서 변수값을 보내 줄 수 있음
//에러체크를 먼저한다.(!video)는(video === null)과 같은 의미

export const getEdit = async(req, res) =>{
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404",{pageTitle: "Video not found."})
    }
    return res.render("edit",{pageTitle: `Edit ${video.title}`,video});
} 

export const postEdit = async(req, res) =>{
    console.log(req.body);
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({_id:id}); //exists
    if(!video){
        return res.render("404",{pageTitle: "Video not found."})
    }
    await Video.findByIdAndUpdate(id,{
        title,
        description,
        hashtags : hashtags.split(",").map((word)=> word.startsWith("#")? word :`#${word}`),
        //hashtags의 경우 새롭게 저장하기 전 실행해야 하는 함수임. 이러한 단계를 처리하기 위한 미들웨어가 존재함.
    })
    //findByIdAndUpdate(id, 업데이트할 항목들) 찾아서 바로 업데이트 까지 처리 가능한 몽구스에서 제공하는 모델
    await video.save();
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
            hashtags:  hashtags.split(",").map((word)=> word.startsWith("#")? word :`#${word}`),
            //startsWith() 어떤 문자열이 특정 문자로 시작하는지 확인하여 결과를 true 혹은 false로 반환
        })
        return res.redirect("/");
    } catch (error){
        console.log(error);
        return res.render("upload", {pageTitle: `upload video`, errorMessage :error._message});

    }
    //try, catch문으로 에러가 일어났을 때 업로드페이지로 보내줌, 에러메세지 보여줌.
    
};