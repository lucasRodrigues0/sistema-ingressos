import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    auth: {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    profile: {
        name: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            required: false
        }
    }
}, { timestamps: true })

export const User = mongoose.model('User', UserSchema);