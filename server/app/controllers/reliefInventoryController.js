import { addReliefItem, listReliefItems, removeReliefItem } from '../services/reliefInventoryService.js';

// Add a relief inventory item
export const addReliefInventory = async (req, res) => {
    const result = await addReliefItem(req.body);
    return res.json(result);
};

// List all relief inventory items
export const listReliefInventory = async (req, res) => {
    const result = await listReliefItems();
    return res.json(result);
};

// Remove a relief inventory item by ID
export const removeReliefInventory = async (req, res) => {
    const result = await removeReliefItem(req.params.id);
    return res.json(result);
};