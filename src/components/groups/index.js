

import React from "react";
import { Link } from 'react-router-dom'
import './card.css'

class Groups extends React.Component {
  
  render() {
    let style = require('./card.css')
    let clases = this.props.classes
    
    return (
      <div className=" table-responsive">
      <table className="table table-hover">
      <tbody>
        {clases.map( data => 
        <tr>
          <th scope="row"><Link to="/tasks">{data.nombre}</Link></th>
        </tr>
        )}
        
      </tbody>
    </table>
    </div>
    );
  }
}

export default Groups;
