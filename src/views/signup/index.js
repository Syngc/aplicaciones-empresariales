import React from "react";
//import style from "./signup.css";
import logo from "../../images/logo_dark.png";
import { withRouter} from "react-router-dom";
class Signup extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      cc: '',
      cctype: 'cc'
    }
  }
  updateType = async (e, type) => {
    e.preventDefault()
    let user = {
      type: type,
      cc: this.state.cc,
      cctype: this.state.cctype
    }
    let result = await this.props.cloud.updateUser(user)
    if(result.status === 'ok'){
      this.props.setLogin(null, true)
      this.props.history.push('/home')
    }
  }
  handler = (e) => {
    this.setState({
      cc: e.target.value
    })
  }  
  handlerC = (e) => {
    this.setState({
      cctype: e.target.value
    })
  }
  render() {
    let style = require("./signup.css");
    return (
      <div className="main">
        <div className="wrapper" style={style.wrapper}>
          <img className="logo" style={style.logo} src={logo} alt="Logo" />
          
          <form>
            <div className="row">
            <div className="input-field col s8">
            <input placeholder="Cedula" id="first_name" type="text" value={this.state.cc} onChange={this.handler} className="validate" data-length="10"/>
            <label htmlFor="first_name">Cedula</label>
          </div>
          <div className="input-field col s4">
          <select className="browser-default" value={this.state.cctype} onChange={this.handlerC}>
            <option value="cc">C.C</option>
            <option value="ti">T.I</option>
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
