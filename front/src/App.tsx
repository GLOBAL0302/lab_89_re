import { Container } from '@mui/material';
import './App.css';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import { Route, Routes } from 'react-router-dom';
import Login from './features/users/Login';
import Register from './features/users/Register';
import Posts from './features/Posts/Posts';
import Postform from './features/Posts/components/PostForm';
import { useAppSelector } from './store/hooks';
import { selectUser } from './features/users/usersSlice';
import ProtectedRoute from './components/UI/ProtectedRoute/ProtectedRoute';

const App = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <header>
        <AppToolBar />
      </header>
      <Container>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route
            path="/addPost"
            element={
              <ProtectedRoute isAllowed={Boolean(user)}>
                <Postform />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
