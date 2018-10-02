
//Dependencies
import React from "react";

//Assets
import Logo from '../../images/Logo_name_dark.png';

class Nav extends React.Component {
  render() {
    return (
        <nav className="navbar navbar-dark bg-dark justify-content-center">
          <a className="navbar-brand abs-center-x" href="#">
            <img src={Logo} width="90" height="30" alt="Workspace-logo" align="center"/>
          </a>
          <a className="navbar-brand abs-right-x" href="#" onClick={this.props.logout}>
            Logout
          </a>
        </nav> 
    );
  }
}

export default Nav;
