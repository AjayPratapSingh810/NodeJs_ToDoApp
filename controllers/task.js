import errorHandeler from "../middlewares/error.js";
import { task } from "../models/task.js";

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;


        await task.create({
            title, description, user: req.user
        });

        res.status(201).json({
            success: true,
            message: "Task Added Successfully",
        });

    } catch (error) {
        next(error);
    }

};


export const getMyTask = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const tasks = await task.find({ user: userId });
        res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        next(error);
    }
};
export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const tasks = await task.findById(id);

        if (!tasks) return next(new errorHandeler());

        tasks.isCompleted = !tasks.isCompleted;
        await tasks.save();

        res.status(200).json({
            success: true,
            message: "Task Updated",
        });
    } catch (error) {
        next(error);
    }

};
export const deleteTask = async (req, res, next) => {

    try {
        const { id } = req.params;
        const tasks = await task.findById(id);

        if (!tasks) return next(new errorHandeler("Task Not Found", 404));
        await tasks.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Deleted",
        });
    } catch (error) {
        next(error);
    }
};