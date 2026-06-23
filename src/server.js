import express from 'express';
import 'dotenv/config';
import { connectDb } from './db/connectDb.js';
import authRouter from './routers/auth.js';
import tasksRouter from './routers/tasks.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import usersRouter from './routers/users.js';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/tasks', tasksRouter);
app.use('/users', usersRouter);

app.use(notFoundHandler);

app.use(errors());
app.use(errorHandler);

await connectDb();

app.listen(PORT, () => {
  console.log('server is running');
});
