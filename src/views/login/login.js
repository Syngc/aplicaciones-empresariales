import React from "react";
import Style from "./login.css";
import logo from "../../images/logo_light.png";

class Login extends React.Component {
  render() {
    return (
      <div className="main" style={Style}>
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
