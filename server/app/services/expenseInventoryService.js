import ExpenseInventoryModel from '../models/ExpenseInventoryModel.js';

export const addExpenseItem = async (data, userId) => {
    try {
        const newItem = await ExpenseInventoryModel.create({
            ...data,
            purchasedBy: userId,
        });
        return { status: 'Success', message: 'Expense item added successfully', data: newItem };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};

export const listExpenseItems = async () => {
    try {
        const items = await ExpenseInventoryModel.find();
        return { status: 'Success', data: items };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};

export const removeExpenseItem = async (id) => {
    try {
        const result = await ExpenseInventoryModel.findByIdAndDelete(id);
        if (!result) {
            return { status: 'Failed', message: 'Expense item not found' };
        }
        return { status: 'Success', message: 'Expense item removed successfully' };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};
