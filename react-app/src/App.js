import React, { useState, useEffect, useContext } from 'react';
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
import SearchPage from './components/SearchPage';
import AppWithContext from './context/AppWithContext';

function App() {
  const dispatch = useDispatch();
  const { confirmedBox } = useContext(AppWithContext);
  const [authenticated, setAuthenticated] = useState(false);
  const [nav, setNav] = useState(true);
  const [loaded, setLoaded] = useState(false);

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
  };

  return (
    <BrowserRouter>
      <NavBar
        nav={nav}
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
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
        <ProtectedRoute path='/search' exact authenticated={authenticated}>
          <SearchPage />
        </ProtectedRoute>
      </Switch>
      <Queue authenticated={authenticated} />
      {confirmedBox && (
        <div className="confirmed-popup fade-out">
          <p>Added to playlist</p>
          <i className="fas fa-check-circle confirmed" />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
