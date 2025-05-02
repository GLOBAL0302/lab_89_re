import express from 'express';
import mongoose, { Schema } from 'mongoose';
import { title } from 'process';

const postSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  create_at: {
    type: String,
    default: () => new Date().toISOString(),
  },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
