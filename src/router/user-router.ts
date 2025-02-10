import express, { Request, Response } from 'express';
import { getUsers, insertUser } from '../controller/user-controller';

export const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/', insertUser);