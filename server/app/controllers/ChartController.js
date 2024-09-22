import {getDailyFundsAndExpenses} from "../services/ChartService.js";


export const dailyFundsAndExpensesReport = async (req, res) => {
    const result = await getDailyFundsAndExpenses();
    return res.json(result);
};
