import mongoose, { Schema } from "mongoose";

const TicketSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true })

export const Ticket = mongoose.model('Ticket', TicketSchema);