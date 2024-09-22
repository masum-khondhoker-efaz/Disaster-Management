import mongoose from 'mongoose';

const ExpenseInventorySchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    cost: { type: String, required: true },
    purchasedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    purchaseDate: { type: Date, default: Date.now },
    status: { type: String, default: 'In Stock', enum: ['In Stock', 'Used'] }
}, {
    timestamps: true,
    versionKey: false
});

const ExpenseInventoryModel = mongoose.model('expenseInventories', ExpenseInventorySchema);

export default ExpenseInventoryModel;
