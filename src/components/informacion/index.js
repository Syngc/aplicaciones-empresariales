
//Dependencies
import React from "react";

class Informacion extends React.Component {
  render() {
    const {
      classInfo,
      type,
      id,
      deleteClass
    } = this.props
    return (
    <div className="row">
      <div className="col s12 m12">
        <div className="card-panel ">
          <span className="title-font">NOMBRE : {classInfo.name}</span>
          <br></br>
          <span className="title-font">CODIGO : {classInfo.code}</span>
          <br></br>
          {
            type === 2 && id === classInfo.teacher && (
              <a className="waves-effect waves-light btn right" onClick={(e)=>{deleteClass(classInfo.id)}}>Eliminar</a>
            )
          }
        </div>
      </div>
    </div>
    );
  }
}

export default Informacion;
