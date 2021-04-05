import React, { useState, useEffect, createContext, useRef } from 'react';
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
import Queue from './components/Queue';

export const AppWithContext = createContext();

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [nav, setNav] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackQueue, setTrackQueue] = useState([]);
  const [trackIdx, setTrackIdx] = useState(0);


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
      <AppWithContext.Provider
        trackQueue={trackQueue}
        setTrackQueue={setTrackQueue}
        value={{
          trackQueue,
          setTrackQueue,
          isPlaying,
          setIsPlaying,
          trackIdx,
          setTrackIdx
        }}
      >
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
            <PlaylistDetail
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              trackQueue={trackQueue}
              setTrackQueue={setTrackQueue}
            />
          </ProtectedRoute>
        </Switch>
        <Queue
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          authenticated={authenticated}
          trackQueue={trackQueue}
          setTrackQueue={setTrackQueue}
        />
      </AppWithContext.Provider>
    </BrowserRouter>
  );
}

export default App;
