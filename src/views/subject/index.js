

import React from "react";
import Nav from '../../components/nav'
import Deliveries from '../../components/deliveries'

class Subject extends React.Component {
  
  render() {
    let data = {
        type: "1"
    }

    let estudiantes = [
        {
            nombre: 'Juanitp',
            link: 'www.google.com',
            nota: '3',
        },{
            nombre: 'Maria',
            link: 'www.github.com',
            nota: '3',
        }]

    return (
        <div className="subject">
            <Nav></Nav>
            <Deliveries></Deliveries>
                
        </div>
        ); 
  }
}

export default Subject;
