import React from "react";
import { element } from "prop-types";
class Miembros extends React.Component {
  render() {
    const {
      students,
      teachers,
      deleteStudents,
      deleteTeachers
    } = this.props
    let studentsList = students.map((element, index) => {
      return  <li className="collection-item" key={index}><div>{element.cc}<div style={{cursor: 'pointer'}} className="secondary-content"><i className="material-icons" onClick={() => deleteStudents(element.id)}>close</i></div></div></li>
    })
    let teachersList = teachers.map((element, index) => {
      return  <li className="collection-item" key={index}><div>{element.cc} - {element.email}<div style={{cursor: 'pointer'}} className="secondary-content"><i className="material-icons" onClick={() => deleteTeachers(element.id)}>close</i></div></div></li>
    })
    return (
      <div>
          <ul className="collection with-header">
            <li className="collection-header"><h4>Profesores</h4></li>
            {
              teachersList
            }
        </ul>
        <ul className="collection with-header">
            <li className="collection-header"><h4>Estudiantes</h4></li>
            {
              studentsList
            }
        </ul>
      </div>

    );
  }
}

export default Miembros;
