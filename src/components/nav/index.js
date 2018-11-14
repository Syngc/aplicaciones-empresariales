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
              <div
                className="navbar-brand abs-left-x"
                onClick={() => this.props.history.goBack()}
              >
                <i className="material-icons">navigate_before</i>
              </div>
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

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <div
                className="navbar-brand abs-right-x"
                onClick={this.props.logout}
              >
                <i className="material-icons">power_settings_new</i>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
