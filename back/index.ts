import express from 'express';
import { json } from 'stream/consumers';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/Users';
import postsRouter from './routers/Posts';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server is runnning on http://localhost:${port}`);
  });
  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
