var assert = require('assert');
import {cloud} from '../src/firebase/cloud'
import { authWithUid } from './firebase.admin'

describe('Authenticated firebase', () => {
  let authedFirebase
  const UID = '8NPb2YPeZNdJ2SgVWfYlgOLYW2z1'
  before(() => {
    authedFirebase = authWithUid(UID)
  })

  // it('allow authenticated user to fetch', function(done) {
  //   this.timeout(20000);
  //   authedFirebase
  //     .then((firebase) => {
  //       const database = firebase.firestore()
  //       const settings = {timestampsInSnapshots: true};
  //       database.settings(settings);
  //       database.collection("users").doc(UID).get()
  //         .then((sn) => {
  //           let email = sn.data().email
  //           assert(email === 'rpamplona.allan@gmail.com','equial')
  //           done()
  //         })
  //         .catch((error) => {
  //           console.log(error)
  //           done(error)
  //         })
  //     })
  // })
  it('ss', function(done) {
    this.timeout(20000);
    authedFirebase
      .then(async (firebase) => {
        let result = await cloud.createClass('test','12345')
        console.log(result)
        const database = firebase.firestore()
        const settings = {timestampsInSnapshots: true};
        database.settings(settings);
        database.collection("users").doc(UID).get()
          .then((sn) => {
            let email = sn.data().email
            assert(email === 'rpamplona.allan@gmail.com','equial')
            done()
          })
          .catch((error) => {
            console.log(error)
            done(error)
          })
      })
  })
})


describe('Create user', function () {
 it('', function () {
        assert.equal("Hello".length, 4);
    });

 it('should return first charachter of the string', function () {
        assert.equal("Hello".charAt(0), 'H');
    });
});