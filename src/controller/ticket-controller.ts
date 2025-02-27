import { NextFunction, Request, Response } from "express";
import { Ticket } from "../model/Ticket";
import { User } from "../model/User";
import { Event } from "../model/Event";
import { NotFoundError } from "../error/api-errors";

export const createTicket = async(req: Request, res: Response, next: NextFunction) => {

    const {userId, eventId} = req.body;

    const user = await User.findById(userId);

    const event = await Event.findById(eventId);

    if(!user) {
        throw new NotFoundError('user not found');
    }
    if(!event) {
        throw new NotFoundError('event not found');
    }

    const ticket = await Ticket.create({
        user: user.profile?.name,
        eventName: event.title
    });

    await ticket.save();

    res.status(201).json(ticket);
}

export const getAllTickets = async(req: Request, res: Response, next: NextFunction) => {

    const tickets = await Ticket.find();

    res.status(200).json(tickets);
}