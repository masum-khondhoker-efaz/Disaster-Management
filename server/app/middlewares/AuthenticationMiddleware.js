import { TokenDecode } from "../utilities/TokenUtility.js";

export default (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];

    // Ensure Authorization header is provided and has a Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: "Failed", message: "Unauthorized: No token or incorrect token format" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'

    // If no token is provided, respond with 401
    if (!token) {
        return res.status(401).json({ status: "Failed", message: "Unauthorized: No token provided" });
    }

    // Decode the token using your TokenDecode utility
    try {
        const decoded = TokenDecode(token);

        // If decoding fails, respond with 401 Unauthorized
        if (!decoded) {
            return res.status(401).json({ status: "Failed", message: "Unauthorized: Invalid token" });
        }

        // If token is valid, extract user information
        const { email, role, user_id } = decoded;

        // Attach user info to the request object (use `req.user` instead of `req.headers`)
        req.user = { email, role, user_id };

        // Proceed to the next middleware
        next();
    } catch (error) {
        return res.status(401).json({ status: "Failed", message: "Unauthorized: Token decoding failed", error: error.toString() });
    }
};
