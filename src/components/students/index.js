import React from "react";

//Components
import Nav from "../../components/nav";

class Students extends React.Component {
  render() {
    let estudiantes = this.props.estudiantes;
    console.log(estudiantes);
    
    return (
      <div className="estudiantes">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Estudiante</th>
              <th scope="col">Repositorio</th>
              <th scope="col">Nota</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map(estudiante => (
              <tr>
                <th scope="row">{estudiante.document}</th>
                <td>
                  <a href={"http://" + estudiante.link}> {estudiante.link} </a>
                </td>
                <td>{estudiante.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Students;
