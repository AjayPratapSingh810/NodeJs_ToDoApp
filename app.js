import express from "express";
import { config } from "dotenv"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
export const app = express();

config({
    path: "./data/config.env"
});

// Use Middle Wares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
// using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);


app.get("/", (req, res) => {
    res.send("Nice Working");
});

// using error middleWare
app.use(errorMiddleware);