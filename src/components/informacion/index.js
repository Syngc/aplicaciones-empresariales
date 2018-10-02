
//Dependencies
import React from "react";

//Assets
import Logo from "../../images/Logo_name_dark.png";

class Informacion extends React.Component {
  render() {
    return (
        
  <div className="row">
    <div className="col s12 m12">
        <div className="card-panel ">
            <span className="title-font">NOMBRE :</span>
            <br></br>
            <span className="title-font">CODIGO :</span>
            <br></br>
            <span className="title-font">NOTICIAS :</span>
            <a class="waves-effect waves-light btn right">Eliminar</a>
        </div>
    </div>
    </div>
          
    );
  }
}

export default Informacion;
