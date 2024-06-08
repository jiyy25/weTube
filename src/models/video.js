import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title : String,
    description : String,
    createAt : Date,
    hashtags : [{type : String}],
    meta : {
        views: Number,
        rating :Number,
    }
}); 
//데이터베이스에게 보내줄 데이터의 값이 어떤 타입인지 알려줘야함. 
//스키마는 데이터 베이스를 매핑하는데 사용되는 정의 정보.

const Video = mongoose.model("Video", videoSchema); //일반적으로 몽구스 모델의 이름에는 대문자 첫 글자를 사용
export default Video;

