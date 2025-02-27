import express from 'express';
import { createEvent, getAllEvents, getEventByName } from '../controller/event-controller';

export const eventRouter = express.Router();

eventRouter.get('/', getAllEvents);
eventRouter.post('/create', createEvent);
// eventRouter.get('/search/:id', getEventById);
eventRouter.get('/search/:name', getEventByName);