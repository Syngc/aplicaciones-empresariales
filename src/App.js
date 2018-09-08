import React, { Component } from "react";
import "./App.css";
import Login from "./views/login";
import {cloud} from './firebase/cloud';
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
        {children}
      </div>
    );
  }

  
}

export default App;
