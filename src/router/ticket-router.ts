import express from 'express';
import { checkIn, createTicket, getAllTickets } from '../controller/ticket-controller';

export const ticketRouter = express.Router();

ticketRouter.post('/create', createTicket);
ticketRouter.get('/', getAllTickets);
ticketRouter.post('/checkin', checkIn);