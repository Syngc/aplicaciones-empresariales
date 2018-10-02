import React from "react";
import Nav from "../../components/nav";
import Delivery from "../../components/delivery";
import Footer from "../../components/footer";
import {Tabs, Tab} from "react-materialize";
import Miembros from "../../components/miembros" 
import Solicitudes from "../../components/solicitudes" 
import Informacion from "../../components/informacion" 


class Tasks extends React.Component {
  render() {
    let data = require("../../data.json");
    let tareas = data.tasks;

    return (
      <div className="view">
        <header>
          <Nav></Nav>
        </header>
        <main>
          <h1 className="float-left title-font"></h1>
          <Tabs className='tab-demo z-depth-1'>
            <Tab title="Entregas" active> <Delivery tareas={tareas} /></Tab>
            <Tab title="Miembros" ><Miembros/></Tab>
            <Tab title="Solicitudes"><Solicitudes/></Tab>
            <Tab title="Información"><Informacion/></Tab>
        </Tabs>
        </main>
      </div>
    );
  }
}

export default Tasks;
