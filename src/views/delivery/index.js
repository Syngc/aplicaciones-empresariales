

import React from "react";
import Nav from '../../components/nav'
import Students from '../../components/students'

class Delivery extends React.Component {
  
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

    if(data.type == "2"){
        return (
            <div className="deliveries">
                <Nav></Nav>
                <h1> Entrega</h1>
                <h3> Descipcion </h3>
                <p>Lorem ipsu</p>
                <form>
                    <span>Fecha de entrega: </span> <input></input>
                </form>
                <h1> Estudiantes</h1>
                <Students estudiantes={estudiantes}></Students>
            </div>
        );
    }else{
        return(  
            <div>
            <Nav></Nav>
            <h1> Entrega</h1>
                <h3> Descripcion </h3>
                <h3>Nota</h3>
                <p>Lorem ipsu</p>
                <span>Fecha de entrega: </span> 
                <form>
                    <h3> Repositorio</h3>
                    <input></input>
                </form>       
            </div>
        )
    }  
  }
}

export default Delivery;
