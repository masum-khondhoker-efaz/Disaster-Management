import { generateDonationReport, generateExpenseReport, generateInventoryReport } from '../services/ReportsService.js';

export const donationReport = async (req, res) => {
    const result = await generateDonationReport();
    if (result.status === 'Success') {
        console.log("CSV file path:", result.data);
        return res.download(result.data); // Automatically downloads the generated CSV/Excel file
    } else {
        console.error('Failed to generate donation report:', result.message);
        return res.status(500).json(result); // Sends error response if failed
    }
};



export const expenseReport = async (req, res) => {
    const result = await generateExpenseReport();
    if (result.status === 'Success') {
        return res.download(result.data); // Automatically downloads the generated CSV/Excel file
    } else {
        return res.status(500).json(result); // Sends error response if failed
    }
};

export const inventoryReport = async (req, res) => {
    const result = await generateInventoryReport();
    if (result.status === 'Success') {
        return res.download(result.data); // Automatically downloads the generated CSV/Excel file
    } else {
        return res.status(500).json(result); // Sends error response if failed
    }
};
