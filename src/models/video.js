import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title : {type: String, required: true, trim: true, mexLength:80},
    description : {type: String, required: true, trim: true, minLength:20},
    createAt : {type : Date, required: true, default: Date.now},
    hashtags : [{type : String, trim: true}],
    meta : {
        views: {type: Number, default:0, required:true},
        rating : {type: Number, default:0, required:true},
    }
}); 
//데이터베이스에게 보내줄 데이터의 값이 어떤 타입인지 알려줘야함. 
//스키마는 데이터 베이스를 매핑하는데 사용되는 정의 정보.
//보안을 위해 mex,minlength는 form과 db에 모두 설정.

//컨트롤러의 업데이트비디오를 실행하기 전 먼저 실행되는 미들웨어 pre("save",async function() )
//하지만  findByIdAndUpdate()에서는 save 훅업이 발생하지 않음 -> 다른방법
/*
videoSchema.pre("save",async function(){
    console.log(this);
    this.hashtags = this.hashtags[0] //하나의 array 문자열로 반환하기 때문에
    .split(",")
    .map(hash => hash.startsWith("#") ? hash : `#${hash}`);
     //startsWith() 어떤 문자열이 특정 문자로 시작하는지 확인하여 결과를 true 혹은 false로 반환
})
     */

//static을 사용하면 import없이도 Model.function()형태로 사용 가능함...!
videoSchema.static("formatHashtags",function(hashtags){
    return hashtags.split(",").map(hash => hash.startsWith("#") ? hash : `#${hash}`);
})

const Video = mongoose.model("Video", videoSchema); //일반적으로 몽구스 모델의 이름에는 대문자 첫 글자를 사용
export default Video;

