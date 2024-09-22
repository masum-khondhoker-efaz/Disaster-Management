import mongoose from 'mongoose';

const ReliefInventorySchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    //donor: { type: String, required: false },  // Optional, if available
    receivedDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Available', enum: ['Available', 'Distributed'] }
}, {
    timestamps: true,
    versionKey: false
});

const ReliefInventoryModel = mongoose.model('reliefInventories', ReliefInventorySchema);

export default ReliefInventoryModel;
