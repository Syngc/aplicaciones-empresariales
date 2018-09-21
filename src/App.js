import React, { Component } from "react";
import "./App.css";
import {cloud} from './firebase/cloud';
import { Route, Switch, Redirect } from 'react-router'
import Login from './views/login';
import Signup from './views/signup';
import Page404 from './views/page404';
import Dashboard from './views/dashboard';
import Tasks from './views/tasks';
import Deliveries from './views/deliveries';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.beforeLogin = this.beforeLogin.bind(this)
    this.setLogin = this.setLogin.bind(this)
  }
  setLogin(user) {
    this.setState({
      user: user
    })
  }

  componentDidMount(){
    let user = JSON.parse(localStorage.getItem('user'))
    if(user){
      this.setState({
        user: user
      }, async () => {
        await cloud.loginWithToken(user.credential)
      })
    }
  }
  beforeLogin() {
    return Object.keys(this.state.user).length === 0
  }
  render() {
    return (
      <div className="App">
        <Switch>
            <Route path="/login" render={() => <Login cloud={cloud} setLogin={this.setLogin} beforeLogin={this.beforeLogin}></Login>} />
            <Route path="/signup" render={() => <Signup cloud={cloud} setLogin={this.setLogin} beforeLogin={this.beforeLogin}></Signup>} />
            <Route path="/home" component={Dashboard}/>
            <Route path="/tasks" component={Tasks} />
            <Route path="/deliveries" component={Deliveries} />
            <Route path="/" component={Page404} />
        </Switch>
      </div>
    );
  }

  
}

export default App;
