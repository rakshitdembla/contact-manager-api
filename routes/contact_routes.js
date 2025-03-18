import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createFn, deleteFn, getFn, updateFn } from "../controllers/contact.js";

const contactsRouter = express.Router();

/**
 * @route POST /contacts/create
 * @desc Create a new contact
 * @access Protected
 */
contactsRouter.post("/create", isAuthenticated, createFn);

/**
 * @route GET /contacts/get
 * @desc Retrieve all contacts for authenticated user
 * @access Protected
 */
contactsRouter.get("/get", isAuthenticated, getFn);

/**
 * @route DELETE /contacts/delete/:id
 * @desc Delete a contact by ID
 * @access Protected
 */
contactsRouter.delete("/delete/:id", isAuthenticated, deleteFn);

/**
 * @route PATCH /contacts/update/:id
 * @desc Update a contact by ID
 * @access Protected
 */
contactsRouter.patch("/update/:id", isAuthenticated, updateFn);

export { contactsRouter };
