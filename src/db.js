import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("open", ()=>{ console.log("Connected to DB!")});
db.once("error",()=>{ console.log("DB error!")});