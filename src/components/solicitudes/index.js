import React from "react";

class Solicitudes extends React.Component {
  render() {
    const {
      students,
      teachers,
      acceptStudent,
      acceptTeacher,
      rejectTeacher,
      rejectStudent
    } = this.props;
    let studentsList = students.map((element, index) => {
      return (
        <li className="collection-item" key={index}>
          <div>
            {element.cc}
            <div
              style={{ cursor: "pointer" }}
              onClick={() => rejectStudent(element.id)}
              className="secondary-content"
            >
              <i className="material-icons">close</i>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => acceptStudent(element.id)}
              className="secondary-content"
            >
              <i className="material-icons">check</i>
            </div>
          </div>
        </li>
      );
    });
    let teachersList = teachers.map((element, index) => {
      return (
        <li className="collection-item" key={index}>
          <div>
            {element.cc} - {element.email}
            <div
              style={{ cursor: "pointer" }}
              onClick={() => rejectTeacher(element.id)}
              className="secondary-content"
            >
              <i className="material-icons">close</i>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => acceptTeacher(element.id)}
              className="secondary-content"
            >
              <i className="material-icons">check</i>
            </div>
          </div>
        </li>
      );
    });
    return (
      <div>
        <ul className="collection with-header">
          <li className="collection-header title-font celerian-text">
            <h4>Profesores</h4>
          </li>
          {teachersList}
        </ul>
        <ul className="collection with-header">
          <li className="collection-header title-font celerian-text">
            <h4>Estudiantes</h4>
          </li>
          {studentsList}
        </ul>
      </div>
    );
  }
}

export default Solicitudes;
