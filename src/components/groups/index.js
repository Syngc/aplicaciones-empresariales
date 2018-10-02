import React from "react";
import { Link } from "react-router-dom";

class Groups extends React.Component {
  render() {
    let clases = this.props.classes;

    return (
      <div>
        <div className="row">
          {clases.map(data => (
            <div className="col s2 m2">
              <div className="card light-green accent-2">
                <div className="card-content  blue-grey-text text-darken-3 title-font">
                  <span className="card-title">
                    <a href="/tasks">{data.nombre}</a>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Groups;
