import express from 'express';
import 'dotenv/config';
import { connectDb } from './db/connectDb.js';
import tasksRouter from './routers/tasks.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(tasksRouter);

app.use(notFoundHandler);

app.use(errorHandler);

await connectDb();

app.listen(PORT, () => {
  console.log('server is running');
});
