import firebase from 'firebase';
require('dotenv').config()
const prodConfig = {
  apiKey: process.env.REACT_APP_INTEGRADOR_API_KEY,
  authDomain: process.env.REACT_APP_INTEGRADOR_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_INTEGRADOR_DATABASE,
  projectId: process.env.REACT_APP_INTEGRADOR_PROJECT_ID,
  storageBucket: process.env.REACT_APP_INTEGRADOR_STORAGE,
  messagingSenderId: process.env.REACT_APP_INTEGRADOR_MESSAGING
};

const devConfig = {
  apiKey: process.env.REACT_APP_INTEGRADOR_API_KEY,
  authDomain: process.env.REACT_APP_INTEGRADOR_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_INTEGRADOR_DATABASE,
  projectId: process.env.REACT_APP_INTEGRADOR_PROJECT_ID,
  storageBucket: process.env.REACT_APP_INTEGRADOR_STORAGE,
  messagingSenderId: process.env.REACT_APP_INTEGRADOR_MESSAGING
};
const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

let fire = null
if (!firebase.apps.length) {
  fire = firebase.initializeApp(config);
}

export {
  fire,
};
