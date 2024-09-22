import fs from 'fs';
import path from 'path';
import { Parser } from 'json2csv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { writeFileSync } from 'fs';


export const createCSV = async (data, fileName) => {
    // Assuming you have a CSV generation library or custom CSV generation logic
    try {
        const csvFilePath = path.join(__dirname, '..', 'reports', `${fileName}.csv`);

        // Generate CSV string (using a library like json2csv or manually)
        const csvString = data.map(row => `${row.Donor},${row.Amount},${row.Date}`).join('\n');

        // Write CSV string to file
        writeFileSync(csvFilePath, csvString, 'utf8');

        return csvFilePath;
    } catch (error) {
        console.error('Error creating CSV file:', error);
        throw new Error('CSV creation failed');
    }
};
