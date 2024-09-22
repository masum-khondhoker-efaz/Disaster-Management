import DonationsModel from "../models/DonationsModel.js";


export const addDonation = async (req) => {
    try{
        let reqBody = req.body;
        await DonationsModel.create(reqBody);
        return {status: "Success", "Message": "Donation Done Successfully"}
    }catch (error){
        return {status:"Failed", data:error.toString()};
    }
};


export const getTotalFunds = async (req, res) => {
    try {
        const totalFunds = await DonationsModel.aggregate([
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        return totalFunds.length ? totalFunds[0].total : 0;
    } catch (error) {
        return { status: "Failed", message: error.toString() };
    }
};


