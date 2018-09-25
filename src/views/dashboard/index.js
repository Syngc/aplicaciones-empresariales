import React from "react";

//Components
import Nav from "../../components/nav";
import Footer from "../../components/footer";
import Groups from "../../components/groups";

class Dashboard extends React.Component {
  render() {
    let data = require("../../data.json");
    let classes = data.classes;
    console.log(classes);

    let newClass = {
      nombre: "Crear nueva clase"
    };
    return (
      <div className="view">
        <header> </header>
        <main>
          <h1 className="float-left title-font">Clases</h1>
          <Groups classes={classes} />
        </main>

        <footer className="page-footer footer-fixed green darken-2">
          <div className="container title-font center">WORKSPACE</div>
        </footer>
      </div>
    );
  }
}

export default Dashboard;
