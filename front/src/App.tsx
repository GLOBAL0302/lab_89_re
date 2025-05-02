import { Container } from '@mui/material';
import './App.css';
import AppToolBar from './components/UI/AppToolBar/AppToolBar';
import { Route, Routes } from 'react-router-dom';
import Login from './features/users/Login';
import Register from './features/users/Register';

const App = () => {
  return (<>
  <header><AppToolBar/></header>
  <Container>
    <Routes>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
    </Routes>
  </Container>
  </>);
};

export default App;
