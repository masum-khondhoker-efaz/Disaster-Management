
import CrisesModel from "../models/CrisesModel.js";
import UsersModel from "../models/UsersModel.js";

export const addCrisis = async (req) => {
    try {
        const reqBody = req.body;

        reqBody.createdBy = req.headers.user_id || null;

        if (req.file) {
            // Store only the filename
            reqBody.image = req.file.filename; // This assumes you're using multer and filename is set correctly
        }

        // Save the crisis in the database
        await CrisesModel.create(reqBody);

        return { status: 'Success', message: 'Crisis added successfully and awaiting admin approval' };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};


// Get all crises
export const getAllCrises = async () => {
    try {
        // Fetch crises with status 'approved' and sort by creation date (latest first)
        let crises = await CrisesModel.find({ status: 'approved' })
            .sort({ createdAt: -1 })
            .select('image title location description severity requiredHelp createdAt status');

        // Format the createdAt date
        crises = crises.map(crisis => ({
            ...crisis.toObject(),
            createdAt: crisis.createdAt.toISOString().split('T')[0] // Format date as YYYY-MM-DD
        }));

        return { status: 'Success', data: crises };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};


// Approve crises by id
export const  updateCrises = async (id) => {
    try {
        const statusCheck = await CrisesModel.find({ _id: id, status: 'pending' });

        if (statusCheck.length === 0) {
            return { status: 'Failed', message: 'Crisis not found' };
        }
        const crisis = await CrisesModel.updateOne({ _id: id }, { status: 'approved' });
        return { status: 'Success', message: 'Crisis approved', data: crisis };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};

// Remove crises by id
export const  deleteCrises = async (id) => {
    try {
        const statusCheck = await CrisesModel.find({ _id: id, status: 'pending' });

        if (statusCheck.length === 0) {
            return { status: 'Failed', message: 'Crisis not found' };
        }
        const volunteer = await CrisesModel.deleteOne({ _id: id }, { status: 'verified' });
        return { status: 'Success', message: 'Volunteer verified', data: volunteer };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};



// Get a single crisis by ID
export const getCrisisById = async (req) => {
    try {
        const id  = req.params.id;
        const crisis = await CrisesModel.findOne({_id: id});
        return { status: 'Success', data: crisis };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};
