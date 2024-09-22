// createAdmin.js
import mongoose from 'mongoose'
import {DATABASE_URL} from "./app/config/config.js";
import UsersModel from "./app/models/UsersModel.js";


const createAdmin = async () => {
    try {
        await mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Directly setting the password without hashing
        const admin = new UsersModel({
            name: 'Admin',
            email: 'admin@example.com',
            password: '1234',
            role: 'admin',
        });

        await admin.save();
        console.log('Admin user created');
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error creating admin:', error);
        await mongoose.connection.close();
    }
};

createAdmin();
