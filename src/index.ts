require('dotenv').config();
import 'express-async-errors';
import express from 'express';
import { db } from './db/db';
import { userRouter } from './router/user-router';
import { ErrorHandler } from './middleware/error-middleware';
import { eventRouter } from './router/event-router';

const app = express();

const port = process.env.PORT ?? 3000;

db();
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);
app.use(ErrorHandler);
app.listen(port, () => console.log('funcionando'));