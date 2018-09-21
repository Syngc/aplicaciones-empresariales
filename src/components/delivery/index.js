
//Dependencies
import React from "react";
import { Link } from 'react-router-dom'


//Assets
import Logo from '../../images/Logo_name_dark.png';

class Delivery extends React.Component {
  render() {
    let data = this.props.tareas
    return (
      <div className=" table-responsive">
        <table className="table  table-hover">
          <tbody>
            {data.map(tarea =>
              <tr>
                <th scope="row"><Link to="/deliveries">{tarea.name}</Link></th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Delivery;
