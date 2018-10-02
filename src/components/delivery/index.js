
//Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {Button, Modal, Row, Input} from 'react-materialize'

//Assets
import Logo from '../../images/Logo_name_dark.png';

class Delivery extends React.Component {

  render() {
    let data = this.props.tareas
    return (
      
        <div class="collection">
        {data.map(tarea => 
           <a class="collection-item"><Link to="/deliveries">{tarea.name}</Link></a>
        )}
        
        <Modal
          header='Agregar entrega'
          trigger={<a class="collection-item grey-text text-lighten-1">Agregar Entrega</a>}>
          
          <Row>
            <Input placeholder="Nombre" s={12} label="Nombre" id="nombre"/>
            <Input placeholder="Descripción" s={12} label="Descripción" id="descripcion"/>
            <label for="fecha">Fecha de entrega</label>
            <input s={6} label='fecha de entrega' type="date" placeholder="fecha" id="fecha"/>  
                    
          </Row>

        </Modal>
          
      </div>
    );
  }
}

export default Delivery;
