import React from "react";
import Nav from "../../components/nav";
import Students from "../../components/students";
import {Tabs, Tab} from "react-materialize";


class Deliveries extends React.Component {
  render() { 
    let data = require("../../data.json");
    let tarea = data.tasks[1];
    let estudiantes = data.deliverables;
    return (    
      <div className="view">
      <header> 
        <Nav logout={this.props.logout}></Nav>
      </header>
      <main>
        <h1 className="float-left title-font"> </h1>
        <Tabs className='tab-demo z-depth-1'>
          <Tab title="Informacion" active> 
          <div className="row">
            <div className="col s12 m12">
                <div className="card-panel ">
                <p className="row">NOMBRE: {tarea.name}</p> 
  
                <p className="row ">DESCRIPCIÓN:<br></br>  {tarea.description}</p>
              <div class="form-group row">
                <label for="example-date-input" class="col-2 col-form-label">
                  Fecha de entrega :{" "}
                </label>
                <div class="col-10">
                  <input
                    class="form-control"
                    type="date"
                    value="2011-08-19"
                    id="example-date-input"
                  />
                </div>
              </div>
            </div>
          </div> 
          </div>
          </Tab>
          <Tab title="Entregas" ><Students  estudiantes={estudiantes} /></Tab>
        </Tabs>
      </main>
    </div>
    );
  }
}

export default Deliveries;
