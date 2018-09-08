import React from "react";
import Nav from "../../components/nav";
import Students from "../../components/students";

class Task extends React.Component {
  render() {
    let type = {
      type: "2"
    };
    let data = require("../../data.json");
    let students = data.estudiantes;
    console.log(students);

    if (type.type == "1") {
      return (
        <div className="tasks">
          <Nav />
          <h1> Entrega</h1>
          <h3> Descipcion </h3>
          <hr/>
          <p>Lorem ipsu</p>
          <form>
            <span>Fecha de entrega: </span> <input />
          </form>
          <hr/>
          <h1> Estudiantes</h1>
          <Students estudiantes={students} />
        </div>
      );
    } else {
      return (
        <div>
          <Nav />
          <h1> Entrega</h1>
          <h3> Descripcion </h3>
          <hr/>
          <h3>Nota</h3>
          <p>Lorem ipsu</p>
          <span>Fecha de entrega: </span>
          <hr/>
          <form>
            <h3> Repositorio</h3>
            <input />
          </form>
        </div>
      );
    }
  }
}

export default Task;
