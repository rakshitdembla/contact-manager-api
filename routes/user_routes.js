import express from "express";
import { registerFn, loginFn } from "../controllers/User.js";

const userRouter = express.Router();

/**
 * @route POST /user/register
 * @desc Register a new user
 * @access Public
 */
userRouter.post("/register", registerFn);

/**
 * @route POST /user/login
 * @desc Authenticate user and return token
 * @access Public
 */
userRouter.post("/login", loginFn);

export { userRouter };
