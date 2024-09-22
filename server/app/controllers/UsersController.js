
import { registerUser, loginUser } from'../services/UsersService.js';

export const handleRegister = async (req, res) => {
        const data = await registerUser(req);
        return res.json(data);
};

export const handleLogin = async (req, res) => {
        const data = await loginUser(req);
        return res.json(data);
};


