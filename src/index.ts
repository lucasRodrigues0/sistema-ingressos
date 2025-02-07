require('dotenv').config();
import 'express-async-errors';
import express, { Request, Response } from 'express';
import { db } from './db/db';
import { User } from './model/User';

const app = express();

const port = process.env.PORT ?? 3000;

db();
app.use(express.json());

app.post('/', async (req: Request, res: Response) => {

    const { email, password, name, profilePicture } = req.body;

    const user = await User.create({
        email,
        password,
        name,
        profilePicture: profilePicture.length === 0 ? profilePicture : null
    });

    res.status(200).json(user);

})

app.get('/', async (req: Request, res: Response) => {

    const users = await User.find();

    const response = users.map(user => {
        return {
            auth: {
                email: user.email,
                password: user.password
            },
            profile: {
                name: user.name,
                profilePicture: user.profilePicture || null
            }
        }
    })

    res.status(200).json(response);
})

app.listen(port, () => console.log('funcionando'));