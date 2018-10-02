import React from "react";

//Components
import Nav from "../../components/nav";
import Sidebar from "../../components/sidebar";
import Groups from "../../components/groups";

class Footer extends React.Component {
  render() {
    let data = require("../../data.json");
    let classes = data.classes;
    console.log(classes);

    let newClass = {
      nombre: "Crear nueva clase"
    };
    return (
      <footer className="page-footer">
        <div className="footer-copyright">
          <div className="container">© 2014 Copyright Text</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
