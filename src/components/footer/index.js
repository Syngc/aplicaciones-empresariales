import React from "react";

class Footer extends React.Component {
  render() {
    let data = require("../../data.json");
    let classes = data.classes;
    console.log(classes);

    let newClass = {
      nombre: "Crear nueva clase"
    };
    return (
      <footer className="page-footer footer-fixed green darken-2">
          <div className="container title-font center">WORKSPACE</div>
      </footer>
    );
  }
}

export default Footer;
