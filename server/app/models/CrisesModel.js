import mongoose from 'mongoose';

const CrisisSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: false },
    description: { type: String, required: true },
    severity: { type: String, required: true, enum: ["1", "2", "3", "4", "5"] }, // Severity scale 1 to 5
    requiredHelp: { type: String, required: true },
    status: { type: String, default: "pending" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null },
    },
    {
        timestamps: true,
        versionKey: false
    });

const CrisesModel = mongoose.model('crises', CrisisSchema);

export default CrisesModel
