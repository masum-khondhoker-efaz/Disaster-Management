import {addDonation, getTotalFunds} from "../services/DonationsService.js";

export const donate = async (req, res) => {
    const data = await addDonation(req);
    return res.json(data);
};

export const getFunds = async (req, res) => {

    const totalFund = await getTotalFunds(req);
    return res.json({ totalFund: totalFund });
};