require('dotenv').config();
import 'express-async-errors';
import express from 'express';
import { db } from './db/db';

const app = express();

const port = process.env.PORT ?? 3000;

db();
app.listen(port, () => console.log('funcionando'));