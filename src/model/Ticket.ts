import mongoose, { Schema } from "mongoose";
import { User } from "./User";

const TicketSchema = new Schema({
    user: User,
    event: Event,
    isValid: Boolean
}, {timestamps: true})

export const Ticket = mongoose.model('tickets', TicketSchema);