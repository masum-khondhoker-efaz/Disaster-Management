import ReliefInventoryModel from '../models/ReliefInventoryModel.js';

export const addReliefItem = async (data) => {
    try {
        const newItem = await ReliefInventoryModel.create(data);
        return { status: 'Success', message: 'Relief item added successfully', data: newItem };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};

export const listReliefItems = async () => {
    try {
        const items = await ReliefInventoryModel.find();
        return { status: 'Success', data: items };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};

export const removeReliefItem = async (id) => {
    try {
        const result = await ReliefInventoryModel.findByIdAndDelete(id);
        if (!result) {
            return { status: 'Failed', message: 'Relief item not found' };
        }
        return { status: 'Success', message: 'Relief item removed successfully' };
    } catch (error) {
        return { status: 'Failed', data: error.toString() };
    }
};
