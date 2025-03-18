import jwt from "jsonwebtoken";
import { userModel } from "../models/User.js";
import bcrypt from "bcryptjs";

/**
 * @api {POST} /register User Registration
 * @desc Registers a new user if email is not already in use
 * @access Public
 */
export const registerFn = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are mandatory in the body!"
        });
    }

    try {
        let userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "User already exists!"
            });
        }
        
        const hashcode = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name,
            email,
            password: hashcode
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully!",
            user
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
};

/**
 * @api {POST} /login User Login
 * @desc Authenticates user and returns a JWT token
 * @access Public
 */
export const loginFn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are mandatory in the body!"
        });
    }

    try {
        const user = await userModel.findOne({ email });
        const validPass = user ? await bcrypt.compare(password, user.password) : null;

        if (!user || !validPass) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized user!"
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d"
        });

        return res.status(200).json({
            success: true,
            message: "User logged-in successfully!",
            token,
            user
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
};