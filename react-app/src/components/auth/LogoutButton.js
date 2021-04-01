import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { logout } from '../../store/session';

const LogoutButton = ({setAuthenticated}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    setAuthenticated(false);
    return history.push("/");
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
