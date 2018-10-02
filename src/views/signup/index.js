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
      this.props.setLogin(null, true)
    }
  }
  beforeLogin(){
    if(this.props.user.additionalUserInfo && !this.props.user.additionalUserInfo.isNewUser){
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
       // this.beforeLogin()
      }
        <div className="wrapper" style={style.wrapper}>
          <img className="logo" style={style.logo} src={logo} alt="Logo" />
          
          <form>
            <div className="row">
            <div class="input-field col s8">
            <input placeholder="Cedula" id="first_name" type="text" class="validate" data-length="10"/>
            <label for="first_name">Cedula</label>
          </div>
          <div class="input-field col s4">
          <select class="browser-default">
            <option value="1">C.C</option>
            <option value="2">T.I</option>
          </select>
          </div>
          </div>
          </form>
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
