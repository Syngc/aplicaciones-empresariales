import React from "react";
import "./login.css";
import logo from "../../images/logo_light.png";
import { withRouter} from "react-router-dom";
class Login extends React.Component {
   async execute(e) {
    let user = await this.props.cloud.login()
    localStorage.setItem('user', JSON.stringify(user))
    if(user.additionalUserInfo.isNewUser){
      this.props.setLogin(user)
      this.props.history.push('/signup')
    } else {
      this.props.setLogin(user)
      this.props.history.push('/home')
    }
  }
  componentDidMount(){
    if(!this.props.beforeLogin()){
      this.props.history.replace('/home')
    } 
  }
  render() {
    return (
      <div className="main">
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
