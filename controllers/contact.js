import { contactsModel } from "../models/Contact.js";

/**
 * @api POST /api/contacts
 * @desc Create a new contact
 * @access Private
 */
export const createFn = async (req, res) => {

    const { name, email, phone, type } = req.body;

    // Check if phone is valid
    if (!/^[0-9]{10}$/.test(phone)) {
        return res.status(400).json({ error: "Invalid phone number format!" });
      }

    // Check if the contact already exists for this user
    const assert = await contactsModel.findOne({ phone: phone, userId: req.authUser._id });
    if (assert) {
        return res.status(409).json({
            success: false,
            message: "Contact already exists!"
        });
    }
    try {
        // Create a new contact
       const contact =  await contactsModel.create({
            name, email, phone, type, userId: req.authUser._id
        });

        return res.status(201).json({
            success: true,
            message: "Contact created successfully!",
            contact
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Invalid or expired token!"
        });
    }
};

/**
 * @api GET /api/contacts
 * @desc Retrieve all contacts for the authenticated user
 * @access Private
 */
export const getFn = async (req, res) => {
    try {
        const contacts = await contactsModel.find({ userId: req.authUser._id });
        
        return res.status(200).json({
            success: true,
            contacts: contacts.length ? contacts : "No contacts found!"
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Invalid or expired token!"
        });
    }
};

/**
 * @api DELETE /api/contacts/:id
 * @desc Delete a contact by ID
 * @access Private
 */
export const deleteFn = async (req, res) => {
    try {
        const removeContact = await contactsModel.findOneAndDelete({ _id: req.params.id, userId: req.authUser._id });
        
        if (removeContact) {
            return res.status(200).json({
                success: true,
                message: "Contact deleted successfully!"
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Contact doesn't exist!"
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Invalid or expired token!"
        });
    }
};

/**
 * @api PUT /api/contacts/:id
 * @desc Update a contact by ID
 * @access Private
 */
export const updateFn = async (req, res) => {
    const { name, email, phone, type } = req.body;

    try {
        const updateContact = await contactsModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.authUser._id },
            { name, email, phone, type },
            { new: true, runValidators: true }
        );

        if (updateContact) {
            return res.status(200).json({
                success: true,
                message: "Contact updated successfully!"
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Contact doesn't exist!"
            });
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Invalid or expired token!"
        });
    }
};