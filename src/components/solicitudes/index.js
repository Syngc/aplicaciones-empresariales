import React from "react";

//Components
import Nav from "../../components/nav";
import Sidebar from "../../components/sidebar";
import Groups from "../../components/groups";

class Solicitudes extends React.Component {
  render() {
    return (
      <div>
          <ul class="collection with-header">
            <li class="collection-header"><h4>Profesores</h4></li>
            <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">close</i></a><a href="#!" class="secondary-content"><i class="material-icons">check</i></a></div></li>
            <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">close</i></a><a href="#!" class="secondary-content"><i class="material-icons">check</i></a></div></li>

        </ul>
        <ul class="collection with-header">
            <li class="collection-header"><h4>Estudiantes</h4></li>
            <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">close</i></a><a href="#!" class="secondary-content"><i class="material-icons">check</i></a></div></li>
            <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">close</i></a><a href="#!" class="secondary-content"><i class="material-icons">check</i></a></div></li>
            <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"><i class="material-icons">close</i></a><a href="#!" class="secondary-content"><i class="material-icons">check</i></a></div></li>

        </ul>
      </div>

    );
  }
}

export default Solicitudes;
