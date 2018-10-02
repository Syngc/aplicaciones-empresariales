import React from "react";
import Nav from "../../components/nav";
import Delivery from "../../components/delivery";

class Tasks extends React.Component {
  render() {
    let data = require("../../data.json");
    let tareas = data.tasks;

    return (
      <div className="subject">
        <header />
        <main>
          <h1 className="float-left title-font">Entregas</h1>
          <Delivery tareas={tareas} />
        </main>
      </div>
    );
  }
}

export default Tasks;
