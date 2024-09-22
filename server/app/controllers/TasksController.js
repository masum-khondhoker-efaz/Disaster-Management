import {createTask, assignVolunteersToTask, listAvailableTasks, availableVolunteers} from '../services/TasksService.js';

export const createTaskController = async (req, res) => {
    const result = await createTask(req);
    return res.json(result);
};

export const assignVolunteersController = async (req, res) => {
    const result = await assignVolunteersToTask(req);
    return res.json(result);
};

export const listAvailableTasksController = async (req, res) => {
    const result = await listAvailableTasks();
    return res.json(result);
};

export const availableVolunteersController = async (req, res) => {
    const result = await availableVolunteers();
    return res.json(result);
};

