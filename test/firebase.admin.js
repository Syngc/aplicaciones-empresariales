import {fire} from '../src/firebase/firebase'
var serviceAccount = require("./key.json");
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath})  

const admin = require("firebase-admin")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.REACT_APP_INTEGRADOR_DATABASE
})

export const authWithUid = (uid) => {
  if (fire.auth().currentUser) {
    // already inited and authenticated
    return Promise.resolve(fire)
  }
  return admin.auth().createCustomToken(uid)
    .then((id_token) => {
      const auth = fire.auth()
      return new Promise((resolve, reject) => {
        auth.signInWithCustomToken(id_token)
          .then(() => {
            resolve(fire)
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
}
