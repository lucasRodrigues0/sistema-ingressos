import express from 'express';
import { createTicket, getAllTickets } from '../controller/ticket-controller';

export const ticketRouter = express.Router();

ticketRouter.post('/create', createTicket);
ticketRouter.get('/', getAllTickets);