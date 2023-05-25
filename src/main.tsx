import React from 'react';
import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import client from './core/api/Api';
import App from './App';
import './assets/styles/fonts.scss';
import './assets/styles/project-vars.scss';
import { store } from './core/store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
