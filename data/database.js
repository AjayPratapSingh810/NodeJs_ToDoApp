import mongoose from "mongoose";

//------------------ DataBase---------------
export const connectDB = () =>{
    mongoose.connect(process.env.MONGO_URI,{
    dbName: "ToDoApp",
}).then(()=>{
    console.log("database connected");
}).catch((error)=>{
    console.log("database error");
})
};