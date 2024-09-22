import DonationsModel from '../models/DonationsModel.js';
import ExpenseInventoryModel from '../models/ExpenseInventoryModel.js';

export const getDailyFundsAndExpenses = async () => {
    try {
        const dailyFunds = await DonationsModel.aggregate([
            { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, total: { $sum: '$amount' } } },
            { $sort: { _id: 1 } }
        ]);

        const dailyExpenses = await ExpenseInventoryModel.aggregate([
            { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }, total: { $sum: '$amount' } } },
            { $sort: { _id: 1 } }
        ]);

        return { dailyFunds, dailyExpenses };
    } catch (error) {
        console.error('Error fetching daily funds and expenses:', error);
       return { error: 'Internal server error' };
    }
};
