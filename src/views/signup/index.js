import React from "react";
//import style from "./signup.css";
import logo from "../../images/logo_dark.png";

class Signup extends React.Component {
  render() {
    let style = require("./signup.css");
    return (
      <div className="main">
        <div className="wrapper" style={style.wrapper}>
          <img className="logo" style={style.logo} src={logo} alt="Logo" />
          <div class="line" style={style.line}>
            <hr />
          </div>
          <button
            className="btn_login  title-font"
            style={style.btn_login}
            onClick={e => this.props.execute(e)}
          >
            Profesor
          </button>

          <button
            className="btn_login  title-font"
            style={style.btn_login}
            onClick={e => this.props.execute(e)}
          >
            Estudiante
          </button>
        </div>
      </div>
    );
  }
}

export default Signup;
