import React from "react";
import "./login.css";
import logo from "../../images/logo_light.png";
import { Redirect } from 'react-router'
import { withRouter, Link } from "react-router-dom";
class Login extends React.Component {
   async execute(e) {
    let that = this
    let user = await this.props.cloud.login()
    localStorage.setItem('user', JSON.stringify(user))
    console.log(user)
    if(user.additionalUserInfo.isNewUser){
      this.props.history.push('/template', { detail: user})
    } else {
      this.props.setLogin(user)
    }
  }
  beforeLogin(){
    if(!this.props.beforeLogin()){
      return (
        <Redirect to={'/home'} />
      )
    } else {
      return null
    }
  }
  render() {
    return (
      <div className="main">
      {
        this.beforeLogin()
      }
        <div className="wrapper">
          <img className="logo" src={logo} alt="Logo" />
          <button
            className="btn_login title-font"
            onClick={e => this.execute(e)}
          >
            LOGIN
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
