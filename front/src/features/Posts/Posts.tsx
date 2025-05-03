import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectPosts, selectPostsFetching } from './postsSlice';
import { getAllPosts } from './postsThunk';
import { CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { apiUrl } from '../../GlobalConstants';
import dayjs from 'dayjs';

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const postsLoading = useAppSelector(selectPostsFetching);

  const fetchAllPosts = useCallback(async () => {
    await dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    void fetchAllPosts();
  }, [fetchAllPosts, dispatch]);

  return (
    <>
      {postsLoading ? (
        <CircularProgress />
      ) : (
        <Grid container gap={2}>
          {posts.map((post) => (
            <Grid key={post._id}>
              <Grid width={200}>
                <CardMedia
                  height="200"
                  component="img"
                  image={post.image ? apiUrl + '/' + post.image : ''}
                  alt={post.description}
                />
              </Grid>
              <Grid>
                <Typography>
                  Title: {post.title} by <strong>{post.user.username}</strong>
                </Typography>
              </Grid>
              <Grid>
                <Typography>Description: {post.description}</Typography>
              </Grid>
              <Grid>
                <Typography>Date: {dayjs(post.create_at).format('YYYY-MM-DD HH:mm:ss')}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
