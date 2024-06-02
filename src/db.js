import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube");

const db = mongoose.connection;

db.on("open", ()=>{ console.log("Connected to DB!")});
db.once("error",()=>{ console.log("DB error!")});