import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router';
import { logout } from '../../store/session';

const LogoutButton = ({setAuthenticated, setShowProfileMenu}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    setShowProfileMenu(false);
    setAuthenticated(false);
    await dispatch(logout());
    return history.push("/");
  };

  return (
    <>
      <button onClick={onLogout}>Logout</button>
      <a
        href="http://www.tedjanton.com/"
        target="_blank"
        rel="noopener noreferrer">About the Developer
      </a>
    </>
  )
};

export default LogoutButton;
