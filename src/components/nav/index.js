
//Dependencies
import React from "react";

//Assets
import Logo from "../../images/Logo_name_dark.png";

class Nav extends React.Component {
  render() {
    return (
        <nav>
          <div className="nav-wrapper green">
          <ul>
            <li>
            <a className="navbar-brand abs-left-x" href="#" onClick={()=> alert('atras')}> 
              <i class="material-icons">navigate_before</i>
            </a>
            </li>
          </ul>
          <a className="brand-logo center" href="#">
            <img src={Logo} width="90" height="30" alt="Workspace-logo" align="center"/>
          </a>
          
          <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
          <a className="navbar-brand abs-right-x" href="#" onClick={()=> alert('Logout')}>
          <i class="material-icons">power_settings_new</i>
          </a></li>
          </ul>
          </div>
        </nav> 
    );
  }
}

export default Nav;
