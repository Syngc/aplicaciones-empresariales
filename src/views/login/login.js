import React from "react";
import "./login.css";
import logo from "../../images/logo_light.png";

class Login extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="wrapper">
          <img className="logo" src={logo} alt="Logo" />

          <button
            className="btn_login title-font"
            onClick={e => this.props.execute(e)}
          >
            LOGIN
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
