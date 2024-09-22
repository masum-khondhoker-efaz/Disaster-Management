import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "volunteer"], default: "volunteer" },
    status: { type: String, enum: ["pending", "verified", "approved"], default: "pending" },
}, {
    timestamps: true,
    versionKey: false
});

const UsersModel = mongoose.model('users', UsersSchema);
export default UsersModel;
