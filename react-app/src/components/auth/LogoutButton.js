import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { logout } from '../../store/session';

const LogoutButton = ({setAuthenticated, setMenu}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    setMenu(false);
    setAuthenticated(false);
    await dispatch(logout());
    return history.push("/");
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
