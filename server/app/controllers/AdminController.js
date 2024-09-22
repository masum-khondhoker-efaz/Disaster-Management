import {
    getPendingVolunteers,
    verifyVolunteerById,
    approveVolunteerById, getApprovedVolunteers, rejectVolunteerById, getAllCrisesAdmin
} from "../services/AdminService.js";

export const getUnverifiedVolunteers = async (req, res) => {
    const result = await getPendingVolunteers();
    return res.json(result);
};

export const verifyVolunteer = async (req, res) => {
    const result = await verifyVolunteerById(req.params.id);
    return res.json(result);
};

export const rejectVolunteer = async (req, res) => {
    const result = await rejectVolunteerById(req.params.id);
    return res.json(result);
};


export const approveVolunteer = async (req, res) => {
    const result = await approveVolunteerById(req.params.id);
    return res.json(result);
};

export const getApprovedVolunteer = async (req, res) => {
    const result = await getApprovedVolunteers();
    return res.json(result);
};


export const assignTasksToVolunteers = async (req, res) => {
    const result = await assignTasks(req.body);
    return res.json(result);
};


// Get all crises
export const listCrisesAdmin = async (req, res) => {
    const result = await getAllCrisesAdmin();
    return res.json(result);
};
