

export const handleHome = (req, res) =>{
    const videos = [
        { 
            title: "First Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 59,
            id: 1,
        },
        {
            title: "Second Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 59,
            id: 1,
        },
        {
            title: "Third Video",
            rating: 5,
            comments: 2,
            createdAt: "2 minutes ago",
            views: 59,
            id: 1,
        },
    ]

    return res.render("home",{pageTitle: "home", videos});
}  //res.render("view") , express가 views 디렉토리에서 그 이름의 pug파일을 찾음, render는 퍼그파일의 이름을 전해주는 것
export const watch = (req, res) => res.render("watch",{pageTitle: "watch"}); //base.pug에서 #{변수} => 각각의 컨트롤러에서 변수값을 보내 줄 수 있음
export const edit = (req, res) => res.render("edit",{pageTitle: "edit"});
export const remove = (req, res) => res.send("Delete Video");
export const upload = (req, res) => res.send("upload Video");
export const search = (req, res) => res.send("search Video");