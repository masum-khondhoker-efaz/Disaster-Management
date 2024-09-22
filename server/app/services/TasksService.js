import TasksModel from '../models/TasksModel.js';
import UsersModel from "../models/UsersModel.js";

export const createTask = async (req) => {
    try {
        let reqBody = req.body;
        reqBody.createdBy = req.headers.user_id || null;

        // Ensure `crisis` and `location` are included in reqBody
        if (!reqBody.crisis || !reqBody.location) {
            return { status: 'Failed', message: 'Crisis and location are required' };
        }

        const newTask = await TasksModel.create(reqBody);

        return { status: 'Success', message: 'Task created successfully', data: newTask };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};


export const assignVolunteersToTask = async (req) => {
    const { taskId, volunteerIds } = req.body;

    try {
        const task = await TasksModel.findById(taskId);

        if (!task) {
            return { status: 'Failed', message: 'Task not found' };
        }

        if (task.assignedVolunteers.length + volunteerIds.length > task.requiredVolunteers) {
            return { status: 'Failed', message: 'Not enough space for more volunteers' };
        }

        // Update both TaskModel and UserModel
        await TasksModel.findByIdAndUpdate(taskId, {
            $push: { assignedVolunteers: { $each: volunteerIds } }
        });

        await UsersModel.updateMany(
            { _id: { $in: volunteerIds } },
            { $push: { assignedTasks: taskId } }
        );

        return { status: 'Success', message: 'Volunteers assigned to task' };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};




export const listAvailableTasks = async () => {
    try {
        const tasks = await TasksModel.find({
            $expr: { $lt: [{ $size: "$assignedVolunteers" }, "$requiredVolunteers"] }
        });

        return { status: 'Success', data: tasks };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};

export const availableVolunteers = async () => {
    try {
        // Find tasks where the number of assigned volunteers is less than required
        const tasks = await TasksModel.find({
            $expr: { $lt: [{ $size: "$assignedVolunteers" }, "$requiredVolunteers"] }
        })
            .select('title location') // Select only necessary fields from tasks
            .populate({
                path: 'assignedVolunteers', // Populate the assignedVolunteers field
                select: 'name email',  // Select only the required fields from the users collection
                model: 'users'              // Reference to the users collection
            });

        return { status: 'Success', data: tasks };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};
