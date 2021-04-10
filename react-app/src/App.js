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
import Queue from './components/Queue';
import PlaylistBrowser from './components/PlaylistBrowser';
import ArtistBrowser from './components/ArtistBrowser';
import AlbumBrowser from './components/AlbumBrowser';
import { authenticate } from './store/session';
import ArtistDetail from './components/ArtistDetail';
import AlbumDetail from './components/AlbumDetail';

export const AppWithContext = createContext();

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [nav, setNav] = useState(true);
  const [inBrowse, setInBrowse] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackQueue, setTrackQueue] = useState([]);
  const [trackIdx, setTrackIdx] = useState(0);
  const paramsRef = useRef();
  const trackRef = useRef();


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
        value={{
          trackQueue,
          setTrackQueue,
          isPlaying,
          setIsPlaying,
          trackIdx,
          setTrackIdx,
          inBrowse,
          setInBrowse,
          paramsRef,
          trackRef
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
            <Landing
              setNav={setNav}
              authenticated={authenticated}
              setAuthenticated={setAuthenticated} />
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
            <PlaylistDetail />
          </ProtectedRoute>
          <ProtectedRoute path='/library/playlists' exact authenticated={authenticated}>
            <PlaylistBrowser />
          </ProtectedRoute>
          <ProtectedRoute path='/library/artists' exact authenticated={authenticated}>
            <ArtistBrowser />
          </ProtectedRoute>
          <ProtectedRoute path='/artists/:id' exact authenticated={authenticated}>
            <ArtistDetail />
          </ProtectedRoute>
          <ProtectedRoute path='/library/albums' exact authenticated={authenticated}>
            <AlbumBrowser />
          </ProtectedRoute>
          <ProtectedRoute path='/albums/:id' exact authenticated={authenticated}>
            <AlbumDetail />
          </ProtectedRoute>
        </Switch>
        <Queue authenticated={authenticated} />
      </AppWithContext.Provider>
    </BrowserRouter>
  );
}

export default App;
