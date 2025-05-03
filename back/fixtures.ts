import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import { randomUUID } from 'crypto';
import Post from './models/Post';
const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('posts');
    await db.dropCollection('users');
  } catch (error) {
    console.log('Collection were not created');
  }

  const [user_1, user_2] = await User.create(
    {
      username: 'Dancer',
      password: '123',
      token: randomUUID(),
    },
    {
      username: 'Singer',
      password: '123',
      token: randomUUID(),
    },
  );

  await Post.create(
    {
      title: 'This one',
      description: '1',
      user: user_1,
      create_at: '2025-05-03T01:24:06.340Z',
      image: 'fixtures/fire.jpeg',
    },
    {
      title: 'This two',
      description: '2',
      user: user_2,
      create_at: '2025-05-03T01:30:33.379Z',
      image: 'fixtures/fire.jpeg',
    },
  );
  await db.close();
};

run().catch(console.error);
