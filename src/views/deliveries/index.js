import React from "react";
import Nav from "../../components/nav";
import Students from "../../components/students";

class Deliveries extends React.Component {
  render() {
    let type = {
      type: "2"
    };

    let data = require("../../data.json");
    let tarea = data.tasks[1]
    let estudiantes = data.deliverables;
    console.log(tarea);


    return (
      <div>
        <Nav />

        <div className="deliveries container">

          <div className="row">
            <h1 className="float-left"> {tarea.name}</h1>
            
          </div>
          <hr></hr>
          <div className="row">
            <div className="container">
              <p className="row ">{tarea.description}</p>
              <div class="form-group row">
                <label for="example-date-input" class="col-2 col-form-label">Fecha de entrega : </label>
                <div class="col-10">
                  <input class="form-control" type="date" value="2011-08-19" id="example-date-input" />
                </div>
              </div>
            </div>
          </div>
          <h2 className="float-left"> Estudiantes</h2>
          <Students estudiantes={estudiantes} />
        </div>
      </div>
    );
  }
}

export default Deliveries;
