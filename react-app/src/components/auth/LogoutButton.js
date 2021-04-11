import React, { useContext } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { AppWithContext } from '../../App';
import { logout } from '../../store/session';

const LogoutButton = ({setAuthenticated, setMenu}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setIsPlaying } = useContext(AppWithContext);
  const onLogout = async (e) => {
    setMenu(false);
    setAuthenticated(false);
    await dispatch(logout());
    setIsPlaying(false);
    return history.push("/");
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
