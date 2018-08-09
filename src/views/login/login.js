import React from 'react';
import './login.css'
import { GithubLoginButton } from "react-social-login-buttons";
import { firebase } from '../../firebase';


class Login extends React.Component {

render() {
return (
<div className="cotn_principal">
  <div className="cont_centrar">
    <div className="cont_login">
      <div className="cont_info_log_sign_up">
        <div className="col_md_login">
          <div className="cont_ba_opcitiy">
            <h2>LOGIN</h2>
            <button className="btn_login" onClick={(e) => this.props.execute(e)}>LOGIN</button>
          </div>
        </div>
        <div className="col_md_sign_up">
          <div className="cont_ba_opcitiy">
            <h2>SIGN UP</h2>
            <button className="btn_sign_up" >STUDENT</button>
            <button className="btn_sign_up" >TEACHER</button>
          </div>
        </div>
       </div>
       <div className="cont_back_info">
        <div className="cont_img_back_grey">
          <img src="https://images.unsplash.com/42/U7Fc1sy5SCUDIu4tlJY3_NY_by_PhilippHenzler_philmotion.de.jpg?ixlib=rb-0.3.5&q=50&fm=jpg&crop=entropy&s=7686972873678f32efaf2cd79671673d" alt="" />
       </div>
      </div>
      <div className="cont_forms" >
    </div>
  </div>
 </div>
</div>
    ) ;
  }
}

export default Login;
