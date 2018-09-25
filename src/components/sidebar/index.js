//Dependencies
import React from "react";

//Assets
import Logo from "../../images/Logo_name_dark.png";

class Sidebar extends React.Component {
  render() {
    return (
      <nav class="nav flex-column">
        <a class="nav-link active" href="#">
          Active
        </a>
        <a class="nav-link" href="#">
          Link
        </a>
        <a class="nav-link" href="#">
          Link
        </a>
        <a class="nav-link disabled" href="#">
          Disabled
        </a>
      </nav>
    );
  }
}

export default Sidebar;
