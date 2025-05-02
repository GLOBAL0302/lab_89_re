import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { IUser } from '../../../types';
import { useAppDispatch } from '../../../store/hooks';
import { logout } from '../../../features/users/usersThunks';
import { logOutReducer } from '../../../features/users/usersSlice';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [usersMenu, setUsersMenu] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setUsersMenu(event.currentTarget);
  };

  const handleClose = () => {
    setUsersMenu(null);
  };

  const handleLogOut = () => {
    dispatch(logOutReducer());
    dispatch(logout());
    handleClose();
  };
  return (
    <div>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.username}!
      </Button>
      <Menu keepMounted anchorEl={usersMenu} open={Boolean(usersMenu)} onClose={handleClose}>
        <MenuItem onClick={() => navigate('/AddPost')}> Add New Post</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
