import express from 'express';
import { donationReport, expenseReport, inventoryReport } from "../app/controllers/ReportsController.js";
import AuthenticationMiddleware from "../app/middlewares/AuthenticationMiddleware.js";

const router = express.Router();

// Route to generate daily donation report
router.get('/donation-report', AuthenticationMiddleware, async (req, res) => {
    try {
        await donationReport(req, res);  // Pass `req` and `res` to the controller
    } catch (error) {
        res.status(500).json({ status: 'Failed', message: error.toString() });
    }
});

// Route to generate daily expense report
router.get('/expense-report', AuthenticationMiddleware, async (req, res) => {
    try {
        await expenseReport(req, res);  // Pass `req` and `res` to the controller
    } catch (error) {
        res.status(500).json({ status: 'Failed', message: error.toString() });
    }
});

// Route to generate inventory report
router.get('/inventory-report', AuthenticationMiddleware, async (req, res) => {
    try {
        await inventoryReport(req, res);  // Pass `req` and `res` to the controller
    } catch (error) {
        res.status(500).json({ status: 'Failed', message: error.toString() });
    }
});

export default router;
