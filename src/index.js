import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
  apiKey: "AIzaSyDOIywCDndp0KS_JDBXyv0R7bVcNBlekSI",
    authDomain: "pseudogram-4c4fb.firebaseapp.com",
    databaseURL: "https://pseudogram-4c4fb.firebaseio.com",
    projectId: "pseudogram-4c4fb",
    storageBucket: "pseudogram-4c4fb.appspot.com",
    messagingSenderId: "832302928393"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
