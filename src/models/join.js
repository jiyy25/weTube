import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {type: String, require: true, unique: true },
    username : {type: String, require: true, unique: true},
    socialOnly: {type: Boolean, default: false},
    password : {type: String},
    name : {type: String, require: true},
    location : String,
});

userSchema.pre("save", async function(){
    console.log("user password:::::", this.password)
    this.password = await bcrypt.hash(this.password, 5); //여기서 this는 userController에서 create되는 User을 가리킴. create되는 password를 암호화 시켜서 저장.
    console.log("hash password:::::", this.password)
})

const User = mongoose.model("User", userSchema);
export default User;