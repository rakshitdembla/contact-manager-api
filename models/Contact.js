import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name : {type: String,required: true},
    email : {type: String,required: true},
    phone : {type: Number,required: true},
    type : {type: String,required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true}, 
});
export const contactsModel = mongoose.model("contacts",contactSchema);