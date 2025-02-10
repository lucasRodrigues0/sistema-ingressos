import { Request, Response } from "express"
import { User } from "../model/User";

export const getUsers = async (req: Request, res: Response) => {

    const users = await User.find();

    res.status(200).json(users);
}

export const insertUser = async (req: Request, res: Response) => {

    const {email, password, name, profilePicture} = req.body;

    const user = await User.create({
        auth: {
            email,
            password
        },
        profile: {
            name,
            profilePicture: profilePicture.legth == 0 ? null : profilePicture
        }
    })

    await user.save();

    res.status(200).json(user);
}