import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { StateProvider } from './context/StateProvider';
import { initialState } from './context/initalState';
import reducer from './context/reduce';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </Router>
  </React.StrictMode>,
);
