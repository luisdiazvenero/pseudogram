import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

require('dotenv').config()

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PR_ID,
  storageBucket: process.env.REACT_APP_ST_BK,
  messagingSenderId: process.env.REACT_APP_MSS_ID
});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
