import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },  // Optional if you link to crisis
    description: { type: String, required: true },
    location: { type: String, ref: 'crises', required: true },  // Link to crisis location
    crisis: { type: mongoose.Schema.Types.ObjectId, ref: 'crises', required: true },  // Reference to the crisis
    requiredVolunteers: { type: String, required: true },  // Number of volunteers required
    assignedVolunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],  // Volunteers assigned to this task
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },  // Admin who created the task
    status: { type: String, default: 'Open' },  // Open, In Progress, Completed
}, {
    timestamps: true,
    versionKey: false
});

const TasksModel = mongoose.model('tasks', TaskSchema);

export default TasksModel;
