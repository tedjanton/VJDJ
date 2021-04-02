import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import LeftMenu from './components/LeftMenu';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Landing from './components/Landing';
import Home from './components/Home';
import PlaylistDetail from './components/PlaylistDetail';
import { authenticate } from './store/session';
import MusicPlayer from './components/MusicPlayer';

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [nav, setNav] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await dispatch(authenticate());
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar nav={nav} authenticated={authenticated} setAuthenticated={setAuthenticated} />
      {authenticated && (
      <>
        <LeftMenu authenticated={authenticated} />
      </>
      )}
      <Switch>
        <Route path='/' exact >
          <Landing setNav={setNav} authenticated={authenticated} />
        </Route>
        <Route path='/login' exact >
          <LoginForm
            setNav={setNav}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path='/sign-up' exact >
          <SignUpForm
            setNav={setNav}
            authenticated={authenticated}
            setAuthenticated={setAuthenticated} />
        </Route>
        <ProtectedRoute path='/home' exact authenticated={authenticated}>
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/playlists/:id' exact authenticated={authenticated}>
          <PlaylistDetail isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
        </ProtectedRoute>
      </Switch>
      <MusicPlayer
        authenticated={authenticated}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </BrowserRouter>
  );
}

export default App;
