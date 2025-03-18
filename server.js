import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./routes/user_routes.js";
import { contactsRouter } from "./routes/contact_routes.js";

dotenv.config(); 
const _server = express();
const _port = process.env.PORT;



/**
 * @api Server Listener
 * @desc Starts the Express server on the specified port
 */
const _listener = _server.listen(_port, () => {
    console.log("Server running at port", _port);
});

/**
 * @api MongoDB Connection
 * @desc Establishes a connection with MongoDB
 */
const _connection = mongoose.connect(process.env.MONGO_URI, {
    dbName: "contactapi"
});

try {
    _connection;
    console.log("Connected successfully to MongoDB!");
} catch (e) {
    console.error("An error occurred while connecting to MongoDB!", e);
}

// Middleware Configuration
_server.use(express.urlencoded({ extended: true }));
_server.use(express.json());

/**
 * @api Routes
 * @desc Defines API routes for user and contact-related requests
 */
_server.use("/api/user", userRouter);
_server.use("/api/contacts", contactsRouter);
