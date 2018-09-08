
//Dependencies
import React from "react";

//Assets
import Logo from '../../images/Logo_name_dark.png';

class Deliveries extends React.Component {
  render() {
    let data = this.props.entregas
    return (
       
<table className="table">
  <thead className="thead-light">
    <tr>
      <th scope="col">Repositorio</th>
    </tr>
  </thead>
  <tbody>
    {data.map( entrega => 
    <tr>
      <th scope="row">{entrega.name}</th>
    </tr>
    )}
    
  </tbody>
</table>
    );
  }
}

export default Deliveries;
