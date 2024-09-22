import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
},
    {
        timestamps: true,
        versionKey: false
    });

const DonationsModel = mongoose.model('donations', donationSchema);

export default DonationsModel;
