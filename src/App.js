import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { firebase } from './firebase';

class App extends Component {
  execute(e) {
    let fire = firebase.firebase
    var provider = new fire.auth.GithubAuthProvider();
    provider.addScope('repo');
    fire.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <button onClick={(e) => this.execute(e)}>
            hola
          </button>
        </p>
      </div>
    );
  }
}

export default App;
