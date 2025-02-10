require('dotenv').config();
import 'express-async-errors';
import express, { Request, Response } from 'express';
import { db } from './db/db';
import { User } from './model/User';
import { userRouter } from './router/user-router';

const app = express();

const port = process.env.PORT ?? 3000;

db();
app.use(express.json());
app.use('/api/user', userRouter);

app.listen(port, () => console.log('funcionando'));