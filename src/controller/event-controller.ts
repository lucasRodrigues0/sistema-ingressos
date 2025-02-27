import { NextFunction, Request, Response } from "express";
import { Event } from "../model/Event";
import { User } from "../model/User";
import mongoose from "mongoose";
import { BadRequestError } from "../error/api-errors";

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {

    const { title, description, startDate, endDate, createdBy } = req.body;

    const user = await User.findById(createdBy);

    if (!user) {
        throw new BadRequestError('user not found');
    }

    const event = await Event.create({
        title,
        description,
        startDate: startDate,
        endDate: endDate,
        createdBy: user.profile?.name
    })

    await event.save();

    res.status(201).json(event);
}

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {

    const events = await Event.find();

    res.status(200).json(events);
}

export const getEventById = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;

    const event = await Event.findById(id);

    res.status(200).json(event);

}

export const getEventByName = async (req: Request, res: Response, next: NextFunction) => {

    const { name } = req.params;

    const event = await Event.find({ name: name }).exec();

    res.status(200).json(event);

}