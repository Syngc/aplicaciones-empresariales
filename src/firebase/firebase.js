import firebase from 'firebase/app';
import 'firebase/auth';
import {apis} from '../config'

const prodConfig = {
  apiKey: apis.apiKey,
  authDomain: apis.authDomain,
  databaseURL: apis.databaseURL,
  projectId: apis.projectId,
  storageBucket: apis.storageBucket,
  messagingSenderId: apis.messagingSenderId
};

const devConfig = {
  apiKey: apis.apiKey,
  authDomain: apis.authDomain,
  databaseURL: apis.databaseURL,
  projectId: apis.projectId,
  storageBucket: apis.storageBucket,
  messagingSenderId: apis.messagingSenderId
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export {
  firebase,
};
