import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { AbilityProvider } from './components/casl/AbilityContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <AbilityProvider>
      <Router>
        <App />
      </Router>
    </AbilityProvider>
  </Provider>,
);
