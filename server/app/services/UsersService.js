import UsersModel from "../models/UsersModel.js";
import {TokenEncode} from "../utilities/TokenUtility.js";


export const registerUser = async (req) => {
    try {
        const reqBody = req.body;

        // Check for existing user by email
        const existingUser = await UsersModel.findOne({ email: reqBody.email });
        if (existingUser) {
            return { status: 'Failed', message: 'Email already exists.' };
        }

        // Create a new user
        await UsersModel.create(reqBody);
        return { status: "Success", message: "Registration Successful" };
    } catch (error) {
        return { status: "Failed", message: error.toString() };
    }
};


export const loginUser = async (req) => {
    try {
        let reqBody = req.body;
        let data = await UsersModel.findOne(reqBody);

        if (data == null) {
            return { status: "Login failed", "Message": "User Not Found" };
        } else {
            // Assuming 'role' is a field in your User model
            let token = TokenEncode(data['email'], data['role'], data['_id']);
            return {
                status: "Success",
                "Message": "User Login Successfully",
                data: {
                    token: token,
                    role: data['role'] // Include the role in the response
                }
            };
        }
    } catch (error) {
        return { status: "Failed", data: error.toString() };
    }
};



