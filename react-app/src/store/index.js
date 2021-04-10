import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import playlistsReducer from "./playlists";
import sessionReducer from "./session";
import tracksReducer from "./tracks";
import artistReducer from "./artists";
import albumReducer from "./albums";

const rootReducer = combineReducers({
  session: sessionReducer,
  playlists: playlistsReducer,
  tracks: tracksReducer,
  artists: artistReducer,
  albums: albumReducer,
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;
