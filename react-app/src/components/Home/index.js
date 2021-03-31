import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPls } from '../../store/playlists';
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getUserPls(user.id))
  }, [user, dispatch])

  return (
    <div className="home-container">
      <h1>Home Page</h1>
    </div>
  )
}

export default Home;
