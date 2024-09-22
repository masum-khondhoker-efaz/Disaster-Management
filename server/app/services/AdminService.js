import UsersModel from "../models/UsersModel.js";
import CrisesModel from "../models/CrisesModel.js";

// Get pending volunteers (status: pending)
export const getPendingVolunteers = async () => {
    try {
        const volunteers = await UsersModel.find({ role: 'volunteer', status: 'pending' });
        return { status: 'Success', data: volunteers };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};

// Verify pending volunteer by ID (status: verified)
export const verifyVolunteerById = async (id) => {
    try {
        const statusCheck = await UsersModel.find({ _id: id, status: 'pending' });

        if (statusCheck.length === 0) {
            return { status: 'Failed', message: 'Volunteer not found or already verified/ approved' };
        }
        const volunteer = await UsersModel.updateOne({ _id: id }, { status: 'verified' });
        return { status: 'Success', message: 'Volunteer verified', data: volunteer };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};

// Reject pending volunteer by ID (status: verified)
export const rejectVolunteerById = async (id) => {
    try {
        const statusCheck = await UsersModel.find({ _id: id, status: 'pending' });

        if (statusCheck.length === 0) {
            return { status: 'Failed', message: 'Volunteer not found or already verified/ approved' };
        }
        const volunteer = await UsersModel.deleteOne({ _id: id }, { status: 'verified' });
        return { status: 'Success', message: 'Volunteer verified', data: volunteer };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};


// Approve volunteer by ID (status: approved)
export const approveVolunteerById = async (id) => {
    try {
        const statusCheck = await UsersModel.find({ _id: id, status: 'verified' });

        if (statusCheck.length === 0) {
            return { status: 'Failed', message: 'Volunteer not found or already approved ' };
        }

        const volunteer = await UsersModel.updateOne({ _id: id }, { status: 'approved' });
        return { status: 'Success', message: 'Volunteer approved' };
    } catch (error) {
        return { status: 'Failed', message: error.toString() };
    }
};

// Get all approve volunteers
export const getApprovedVolunteers = async () => {
    try {
        const approvedVolunteers = await UsersModel.find({ status: 'verified' });
        return { status: 'Success',data: approvedVolunteers };
    } catch (error) {
        return { status: 'Failed', message: error.toString() };
    }
};


// Get all crises
export const getAllCrisesAdmin = async () => {
    try {
        let crises = await CrisesModel.find({status: 'pending'}).sort({ createdAt: -1 }).select(' image title' +
            ' location description severity requiredHelp createdAt status');
        // Format createdAt date
        crises = crises.map(crisis => ({
            ...crisis.toObject(),
            createdAt: crisis.createdAt.toISOString().split('T')[0] // Format date
        }));
        return { status: 'Success', data: crises };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};
