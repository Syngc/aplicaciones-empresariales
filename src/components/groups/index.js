import React from "react";
import { Link } from "react-router-dom";

class Groups extends React.Component {
  render() {
    let clases = this.props.classes;

    return (
        <div className="row">
          <div className="col s12 m12">
            <div className="card-panel ">
            <div className="row">
              {clases.map(data => (
                <div className="col s2 m2">
                  <div className="card light-green accent-2">
                    <div className="card-content  blue-grey-text text-darken-3">
                      <span className="card-title">
                        <a href="/tasks">{data.nombre}</a>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col s2 m2">
                  <div className="card light-green accent-2">
                    <div className="card-content  blue-grey-text text-darken-3">
                      <span className="card-title">
                        <a href="/tasks">Nueva clase</a>
                      </span>
                    </div>
                  </div>
                </div>
                </div>
            </div>
          </div>
        </div>  
    );
  }
}

export default Groups;
