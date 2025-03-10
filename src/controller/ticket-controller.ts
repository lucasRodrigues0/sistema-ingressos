import { NextFunction, Request, Response } from "express";
import { Ticket } from "../model/Ticket";
import { User } from "../model/User";
import { Event } from "../model/Event";
import { BadRequestError, NotFoundError } from "../error/api-errors";

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

    const ticketAlreadyExists = await Ticket.findOne({email: user.auth?.email});

    if(ticketAlreadyExists) {
        throw new BadRequestError('Ticket already emitted for this user');
    }

    const ticket = await Ticket.create({
        user: user.profile?.name,
        email: user.auth?.email,
        eventName: event.title
    });

    await ticket.save();

    res.status(201).json(ticket);
}

export const getAllTickets = async(req: Request, res: Response, next: NextFunction) => {

    const tickets = await Ticket.find();

    res.status(200).json(tickets);
}