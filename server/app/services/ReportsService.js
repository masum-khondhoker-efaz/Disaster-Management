import DonationsModel from '../models/DonationsModel.js';
import ExpenseInventoryModel from '../models/ExpenseInventoryModel.js';

import { createCSV } from '../utilities/CSVUtility.js';
import ReliefInventoryModel from "../models/ReliefInventoryModel.js"; // Utility for creating CSV/Excel

// Generate daily donation report
export const generateDonationReport = async () => {
    try {
        const donations = await DonationsModel.find({
            createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } // Today's donations
        });
        console.log("Donations fetched:", donations);

        // Proceed to generate a report even if no donations are found
        const csvData = donations.length > 0 ? donations.map(donation => ({
            Donor: donation.donorName,
            Amount: donation.amount,
            Date: donation.createdAt
        })) : [];

        // Create the CSV file even if the csvData is empty
        const csvFile = await createCSV(csvData, 'donation_report');
        return { status: 'Success', message: 'Donation report generated', data: csvFile };

    } catch (error) {
        console.error('Error generating donation report:', error);
        return { status: 'Failed', message: error.toString() };
    }
};



// Generate daily expense report
export const generateExpenseReport = async () => {
    try {
        const expenses = await ExpenseInventoryModel.find({
            createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } // Today's expenses
        });

        const csvData = expenses.map(expense => ({
            Item: expense.item,
            Amount: expense.amount,
            Date: expense.createdAt,
            PurchasedBy: expense.purchasedBy
        }));

        const csvFile = await createCSV(csvData, 'expense_report');
        return { status: 'Success', message: 'Expense report generated', data: csvFile };
    } catch (error) {
        return { status: 'Failed', message: error.toString() };
    }
};

// Generate inventory report
export const generateInventoryReport = async () => {
    try {
        // Fetch data from both inventory types
        const expenseItems = await ExpenseInventoryModel.find();
        const reliefItems = await ReliefInventoryModel.find();

        // Map and combine the data from both inventories
        const expenseData = expenseItems.map(item => ({
            Item: item.itemName,
            Quantity: item.quantity,
            Category: 'Expense',
            DateAdded: item.createdAt
        }));

        const reliefData = reliefItems.map(item => ({
            Item: item.itemName,
            Quantity: item.quantity,
            Category: 'Relief',
            DateAdded: item.createdAt
        }));

        // Combine data from both inventories into one array
        const combinedData = [...expenseData, ...reliefData];

        // Generate the CSV file
        const csvFile = await createCSV(combinedData, 'inventory_report');
        return { status: 'Success', message: 'Inventory report generated', data: csvFile };
    } catch (error) {
        return { status: 'Failed', message: error.toString() };
    }
};
