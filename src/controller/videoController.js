let videos = [
    { 
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 1,
        id: 1,
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 2,
    },
    {
        title: "Third Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 3,
    },
]

export const handleHome = (req, res) =>{
    return res.render("home",{pageTitle: "home", videos});
}  //res.render("view") , express가 views 디렉토리에서 그 이름의 pug파일을 찾음, render는 퍼그파일의 이름을 전해주는 것

export const watch = (req, res) => {
    // console.log(req.params)
    const { id } = req.params; //주소의 id값
    const video = videos[id-1]; //videos의 인덱스-1을해서 주소 파라미터의 아이디값과 일치시켜줌
    return res.render("watch",{pageTitle: `Watching ${video.title}`, video});
} //base.pug에서 #{변수} => 각각의 컨트롤러에서 변수값을 보내 줄 수 있음

export const getEdit = (req, res) =>{
    const { id } = req.params;
    const video = videos[id-1];
    return res.render("edit",{pageTitle: `Edit ${video.title}`, video});
} 

export const postEdit = (req, res) =>{
    console.log(req.body);
    const { id } = req.params;
    const { title } = req.body;
    videos[id-1].title = title;
    return res.redirect(`/videos/${id}`); //redirect:설정한 주소로 다시 보냄
};

export const getUploadVideo = (req, res) =>{
    return res.render("upload", {pageTitle: `upload video`});
};

export const postUploadVideo = (req, res) => {
    // console.log("upload:::::",req.body)
    const {title} = req.body;
    const newVideo = {
        title,
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 1,
        id: videos.length,
    }
    videos.push(newVideo);
    return res.redirect("/");
}