import React from "react";
class Miembros extends React.Component {
  render() {
    const {
      students,
      teachers,
      deleteStudents,
      deleteTeachers,
      type
    } = this.props
    let studentsList = students.map((element, index) => {
      let deleted = type === 2 ? (<div style={{cursor: 'pointer'}} className="secondary-content"><i className="material-icons" onClick={() => deleteStudents(element.id)}>close</i></div>) : (null) 
      return  <li className="collection-item" key={index}><div>{element.cc}{deleted}</div></li>
    })
    let teachersList = teachers.map((element, index) => {
      let deleted = type === 2 ? (<div style={{cursor: 'pointer'}} className="secondary-content"><i className="material-icons" onClick={() => deleteTeachers(element.id)}>close</i></div>) : (null)
      return  <li className="collection-item" key={index}><div>{element.cc} - {element.email}{deleted}</div></li>
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
