import React from "react";

class Students extends React.Component {
  render() {
    let estudiantes = this.props.estudiantes;
    return (
      <div className="row">
       <div className="col s12 m12">
        <div className="card-panel ">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Estudiante</th>
              <th scope="col">Repositorio</th>
              <th scope="col">Nota</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((estudiante, index) => (
              <tr key = {index}>
                <th scope="row">{estudiante.cc}</th>
                <td>
                  <a href={"http://" + estudiante.delivery.link}> {estudiante.delivery.link} </a>
                </td>
                <td>{estudiante.delivery.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        </div>
    );
  }
}

export default Students;