import React from "react";
//import style from "./signup.css";
import logo from "../../images/logo_dark.png";
import { withRouter, Redirect} from "react-router-dom";
class Signup extends React.Component {
  async updateType(e, type){
    e.preventDefault()
    let user = {
      type: type
    }
    let result = await this.props.cloud.updateUser(user)
    if(result.status === 'ok'){
      this.props.setLogin(this.props.location.state.user)
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
    let style = require("./signup.css");
    return (
      <div className="main">
      {
        this.beforeLogin()
      }
        <div className="wrapper" style={style.wrapper}>
          <img className="logo" style={style.logo} src={logo} alt="Logo" />
          <div className="line" style={style.line}>
            <hr />
          </div>
          <button
            className="btn_login  title-font"
            style={style.btn_login}
            onClick={e => this.updateType(e, 2)}
          >
            Profesor
          </button>

          <button
            className="btn_login  title-font"
            style={style.btn_login}
            onClick={e => this.updateType(e, 1)}
          >
            Estudiante
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
