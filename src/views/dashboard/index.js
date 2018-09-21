import React from "react";

//Components
import Nav from '../../components/nav'
import Groups from '../../components/groups'


class Dashboard extends React.Component {
  render() {
    let data = require("../../data.json");
    let classes = data.classes
    console.log(classes);
    
    let newClass = {
      nombre : "Crear nueva clase",
    }
    return (
      <div className="dashboard">
        <Nav></Nav>
        <div className="container h-100">
        <h1 className="float-left">Clases</h1>
          <h2 className="float-right"> + </h2>
           
            <Groups classes={classes}></Groups>
          </div>        
      </div>
    );
  }
}

export default Dashboard;
