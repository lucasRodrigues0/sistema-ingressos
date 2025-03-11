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

    const ticketAlreadyExists = await Ticket.findOne({user: user._id, event: event._id});

    if(ticketAlreadyExists) {
        throw new BadRequestError('Ticket already emitted for this user');
    }

    const ticket = await Ticket.create({
        user: user._id,
        event: event._id
    });

    await ticket.save();

    const response = {
        user: user.profile?.name,
        email: user.auth?.email,
        eventName: event.title
    }

    res.status(201).json(response);
}

export const getAllTickets = async(req: Request, res: Response, next: NextFunction) => {

    const {userId, eventId} = req.query;

    if (!userId || !eventId) {
        throw new BadRequestError('Missing required query parameters: userId and eventId');
    }

    const user = await User.findById(userId).lean();

    if(!user) {
        throw new NotFoundError('user not found');
    }

    const event = await Event.findById(eventId).lean();

    if(!event) {
        throw new NotFoundError('event not found');
    }

    if(user.profile?.name !== event.createdBy) {
        throw new BadRequestError('Not authorized for this operation');
    }

    const tickets = await Ticket.find({event: eventId.toString()}).lean();

    const usersId = [...new Set(tickets.map(ticket => ticket.user.toString()))];

    const users = await User.find({_id: {$in: usersId}}).select('profile.name auth.email').lean();

    const userMap = Object.fromEntries(users.map(user => [user._id.toString(), user]));

    const response = tickets.map(ticket => {
        const ticketUser = userMap[ticket.user.toString()];
        return {
            user: ticketUser?.profile?.name || 'unknown',
            email: ticketUser?.auth?.email || 'unknown',
            event: event.title,
            isValid: ticket.isValid
        }
    })

    res.status(200).json(response);
}

export const checkIn = async(req: Request, res: Response, next: NextFunction) => {
    const { ticketId } = req.body;
    
    const ticket = await Ticket.findById(ticketId);

    if(!ticket) {
        throw new NotFoundError('Invalid Ticket');
    }

    if(!ticket.isValid) {
        throw new BadRequestError('Ticket no longer valid');
    }

    ticket.isValid = false;

    await ticket.save();

    res.status(200).json({message: "success"});

}