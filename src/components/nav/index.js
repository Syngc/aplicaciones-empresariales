//Dependencies
import React from "react";
import { withRouter } from "react-router";
//Assets
import Logo from "../../images/Logo_name_dark.png";

class Nav extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper celerian">
          <ul>
            <li>
              <a>
                <div
                  className="navbar-brand abs-left-x"
                  onClick={() => this.props.history.goBack()}
                >
                  <i className="material-icons">navigate_before</i>
                </div>
              </a>
            </li>
          </ul>
          <a className="brand-logo center" href="!#">
            <img
              src={Logo}
              width="90"
              height="30"
              alt="Workspace-logo"
              align="center"
            />
          </a>

          <a href="!#" className="">
            <div className="navbar-brand right " onClick={this.props.logout}>
              <i className="material-icons padding-right">power_settings_new</i>
            </div>
          </a>
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
