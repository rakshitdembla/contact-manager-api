import jwt from "jsonwebtoken";
import { userModel } from "../models/User.js";

/**
 * @middleware isAuthenticated
 * @desc Middleware to verify JWT token and authenticate user
 * @access Protected
 */
export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        // Check if authorization header exists and is correctly formatted
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "User is unauthorized!"
            });
        }
        
        // Extract token from header
        const authToken = authHeader.split(" ")[1];
        
        // Verify JWT token
        const verifyToken = jwt.verify(authToken, JWT_SECRET_KEY);
        const userId = verifyToken.userId;
        
        // Find user by decoded token ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user!"
            });
        }
        
        // Attach authenticated user to request object
        req.authUser = user;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token!"
        });
    }
};
