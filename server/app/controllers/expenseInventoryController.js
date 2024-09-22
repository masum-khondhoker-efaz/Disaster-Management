import { addExpenseItem, listExpenseItems, removeExpenseItem } from '../services/expenseInventoryService.js';

// Add an expense inventory item
export const addExpenseInventory = async (req, res) => {
    const result = await addExpenseItem(req.body, req.headers.user_id);
    return res.json(result);
};

// List all expense inventory items
export const listExpenseInventory = async (req, res) => {
    const result = await listExpenseItems();
    return res.json(result);
};

// Remove an expense inventory item by ID
export const removeExpenseInventory = async (req, res) => {
    const result = await removeExpenseItem(req.params.id);
    return res.json(result);
};