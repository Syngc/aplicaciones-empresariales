import React from "react";

//Components
import Nav from "../../components/nav";
import Card from "../../components/card";

class Students extends React.Component {
  render() {
    let students = this.props.estudiantes;

    return (
      <div className="students">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Estudiante</th>
              <th scope="col">Repositorio</th>
              <th scope="col">Nota</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr>
                <th scope="row">{student.nombre}</th>
                <td>
                  <a href={"http://" + student.link}> {student.link} </a>
                </td>
                <td>{student.nota}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Students;
