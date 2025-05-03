import express from 'express';
import { Error } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../middleware/multer';
import Post from '../models/Post';

const postsRouter = express.Router();

postsRouter.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('user');
    const sortedPost = posts.sort((a, b) => -a.create_at.localeCompare(b.create_at));
    res.status(200).send(sortedPost);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});

postsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const newPost = {
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      image: req.file ? 'images' + req.file.filename : null,
    };

    const post = new Post(newPost);

    post.save();
    res.status(200).send({ message: 'Successfully added new post', post });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send(error);
    }
    next(error);
  }
});

export default postsRouter;
