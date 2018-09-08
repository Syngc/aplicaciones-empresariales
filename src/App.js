<<<<<<< HEAD
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./views/login";
import Signup from "./views/signup";
import { firebase } from "./firebase";
=======
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './views/login/login'
import {cloud} from './firebase/cloud';
>>>>>>> origin/Back
import { GithubLoginButton } from "react-social-login-buttons";
import { GoMarkGithub } from "react-icons/go";
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      repos: []
    };
    this.execute = this.execute.bind(this);
    this.renderRepositories = this.renderRepositories.bind(this);
  }
<<<<<<< HEAD

  execute(e) {
    let that = this;
    let fire = firebase.fire.firebase_;
    var provider = new fire.auth.GithubAuthProvider();
    provider.addScope("repo");
    fire
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        that.setState(
          {
            user: result
          },
          () => {
            fetch(that.state.user.additionalUserInfo.profile.repos_url)
              .then(res => {return res.json();})
              .then(res => {
                that.setState({repos: res},() => {});
              });
          }
        );
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
=======
  async execute(e) {
    let that = this
    let user = await cloud.login()
    localStorage.setItem('user', JSON.stringify(user))
    //TODO: Catch the error message if exists
    fetch(user.additionalUserInfo.profile.repos_url).then((res)=>{
      return(res.json())
    }).then((res)=>{
      that.setState({
      repos: res
      })
    })
  }
  componentDidMount(){
    let user = JSON.parse(localStorage.getItem('user'))
    let that = this
    if(user){
      that.setState({
        user: user
      })
      fetch(user.additionalUserInfo.profile.repos_url+'?access_token='+user.credential.accessToken).then((res)=>{
        return(res.json())
      }).then((res)=>{
        that.setState({
        repos: res
        })
      })
    }
>>>>>>> origin/Back
  }


  beforeLogin() {
    if (
      Object.keys(this.state.user).length === 0 &&
      this.state.user.constructor === Object
    ) {
      return (
        <div>
          <Login execute={this.execute} />
        </div>
      );
    } else {
      return null;
    }
  }


  renderRepositories() {
    if (this.state.repos.length === 0) {
      return null;
    } else {
      let component = [];
      for (let i = 0; i < this.state.repos.length; i++) {
        let comp = (
          <li className="repo" key={i}>
            <div style={{ float: "left", textAlign: "left" }}>
              <h2>{this.state.repos[i].name}</h2>
              <p>{this.state.repos[i].description}</p>
            </div>
            <div tyle={{ float: "right" }} className="repoImage">
              <a href={this.state.repos[i].html_url}>
                <GoMarkGithub size="3em" />
              </a>
            </div>
          </li>
        );
        component.push(comp);
        if (i === this.state.repos.length - 1) {
          return component;
        }
      }
    }
  }

  static propTypes = { 
    children: PropTypes.object.isRequired
  };

  render() {
    const {children}  = this.props;
    return (
      <div className="App">
<<<<<<< HEAD
        {children}
=======
        <header className="App-header">
        </header>
        {
          this.beforeLogin()
        }
        <ul style={{listStyle: "none", display: "flex", flexDirection:"column"}}>
          {
            this.renderRepositories()
          }
        </ul>
        <button onClick={(e) => this.prueba(e)}>
          a
        </button>
>>>>>>> origin/Back
      </div>
    );
  }

  
}

export default App;
