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

const Video = mongoose.model("Video", videoSchema); //일반적으로 몽구스 모델의 이름에는 대문자 첫 글자를 사용
export default Video;

