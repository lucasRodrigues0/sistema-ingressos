import { timeStamp } from "console";
import mongoose, { Schema } from "mongoose";

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
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    createdBy: {
        type: String,

    }
}, {timestamps: true});

export const Event = mongoose.model('events', EventSchema);