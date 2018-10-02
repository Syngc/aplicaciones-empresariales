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
  async setLogin(user, val) {
    if(val){
      let user = await cloud.loginWithToken(this.state.user.credential)
      this.setState({
        user: user.user
      })
    } else {
      this.setState({
        user: user
      })
    }
  }
  async componentWillMount(){
    let user = JSON.parse(localStorage.getItem('user'))
    if(user){
      await this.setState({
        user: user
      }, async () => {
        cloud.loginWithToken(user.credential)
      })
    }
  }
  beforeLogin() {
    return Object.keys(this.state.user).length === 0
  }

  render() {
    const {children}  = this.props;
    return (
      <div className="App">
        <Switch>
            <Route path="/login" render={() => <Login cloud={cloud} setLogin={this.setLogin} beforeLogin={this.beforeLogin}></Login>} />
            <Route path="/signup" render={() => <Signup cloud={cloud} setLogin={this.setLogin} user={this.state.user}></Signup>} />
            <Route path="/home" render={() => <Dashboard cloud={cloud} beforeLogin={this.beforeLogin} user={this.state.user}></Dashboard>}/>
            <Route path="/tasks" component={Tasks} />
            <Route path="/deliveries" component={Deliveries} />
            <Route path="/" component={Page404} />
        </Switch>
      </div>
    );
  }

  
}

export default App;
