import mongoose, { Schema } from "mongoose";
import { User } from "./User";

const TicketSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    isValid: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

export const Ticket = mongoose.model('tickets', TicketSchema);