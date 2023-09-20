import mongoose from "mongoose";

//------------------ DataBase---------------
export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "ToDoApp",
    }).then((c) => {
        console.log(`database connected with ${c.connection.host}`);
    }).catch((error) => {
        console.log("database error");
    })
};