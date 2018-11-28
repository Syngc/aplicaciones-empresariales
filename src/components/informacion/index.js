//Dependencies
import React from "react";

class Informacion extends React.Component {
  render() {
    const { classInfo, type, id, deleteClass } = this.props;
    return (
      <div className="row">
        <div className="col s12 m12">
          <div className="card-panel ">
            {type === 2 && id === classInfo.teacher && (
              <a
                className="waves-effect waves-light btn right celerian"
                onClick={e => {
                  deleteClass(classInfo.id);
                }}
              >
                Eliminar
              </a>
            )}
            <span className="title-font">NOMBRE : {classInfo.name}</span>
            <br />
            <span className="title-font">CODIGO : {classInfo.code}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Informacion;
