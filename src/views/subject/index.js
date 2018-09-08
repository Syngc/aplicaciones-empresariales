

import React from "react";
import Nav from '../../components/nav'
import Deliveries from '../../components/deliveries'

class Subject extends React.Component {
  
    
  render() {

    let data = require("../../data.json");
    let materia = data.entregas

    
    return (
        <div className="subject">
            <Nav></Nav>
            <Deliveries entregas={materia}></Deliveries>
                
        </div>
        ); 
  }
}

export default Subject;
