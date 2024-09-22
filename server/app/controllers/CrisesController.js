import {addCrisis, deleteCrises, getAllCrises, getCrisisById, updateCrises} from "../services/CrisesService.js";


// Add a new crisis
export const createCrisis = async (req, res) => {
    const result = await addCrisis(req);
    return res.json(result);
};

// Get all crises
export const listCrises = async (req, res) => {
    const result = await getAllCrises();
    return res.json(result);
};

// approve crises
export const approveCrises = async (req, res) => {
    const result = await updateCrises(req.params.id);
    return res.json(result);
};

// Remove crises by id
export const removeCrises = async (req, res) => {
    const result = await deleteCrises(req.params.id);
    return res.json(result);
};



// Get a specific crisis by ID
export const fetchCrisis = async (req, res) => {

    const result = await getCrisisById(req);
    return res.json(result);
};
