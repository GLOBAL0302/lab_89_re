import { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField } from '@mui/material';
import FileInput from '../../../components/FileInput/FileInput';
import { addPostThunk } from '../postsThunk';
import { IPostMutation } from '../../../types';

interface Props {}

const initialState = {
  title: '',
  description: '',
  image: null,
};

const Postform: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [postForm, setPostForm] = useState<IPostMutation>(initialState);

  const handleChangePostForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPostForm({
      ...postForm,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addPostThunk(postForm));
    navigate('/');
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setPostForm((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <Grid container onSubmit={onSubmit} flexDirection="column" gap={2} component="form">
      <Grid>
        <TextField
          fullWidth
          label="Title"
          name="title"
          id="title"
          value={postForm.title}
          onChange={handleChangePostForm}
          variant="outlined"
          color="primary"
        />
      </Grid>
      <Grid>
        <TextField
          fullWidth
          label="Description"
          name="description"
          id="description"
          value={postForm.description}
          onChange={handleChangePostForm}
          variant="outlined"
          color="primary"
        />
      </Grid>
      <FileInput name="image" label="image" onGetFile={onChangeFile} />
      <Button type="submit" variant="contained" color="primary" name="image">
        Add Post
      </Button>
    </Grid>
  );
};

export default Postform;
