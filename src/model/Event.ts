import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";
import { User } from "./User";

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    createdBy: {
        type: String,
        required: true
    }
}, {timestamps: true});

export const Event = mongoose.model('events', EventSchema);