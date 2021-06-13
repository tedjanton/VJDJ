import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';
import * as sessionActions from './store/session';
import { AudioContextProvider } from './context/AudioContext';
import { UIContextProvider } from './context/UIContext';
import { ModalProvider } from './context/Modal';
import App from './App';
import './index.css';

const store = configureStore();

// removes store from console for production environment
if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
};

function Root() {
  return (
    <Provider store={store}>
      <UIContextProvider>
        <AudioContextProvider>
          <ModalProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ModalProvider>
        </AudioContextProvider>
      </UIContextProvider>
    </Provider>
  )
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
