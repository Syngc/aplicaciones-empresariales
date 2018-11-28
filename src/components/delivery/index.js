//Dependencies
import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, Row, Input } from "react-materialize";

import { cloud } from "../../firebase/cloud";
class Delivery extends React.Component {
  state = {
    nombre: "",
    descripcion: "",
    fecha: ""
  };
  handler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  closeModal = () => {
    this.setState({
      nombre: "",
      descripcion: "",
      fecha: ""
    });
  };
  saveTask = async e => {
    e.preventDefault();
    const { nombre, descripcion, fecha } = this.state;
    let result = await cloud.createTask(
      this.props.id,
      descripcion,
      fecha,
      nombre
    );
    if (result.status === "created") {
      this.props.getTasks();
    }
  };
  toDelivery = async id => {
    this.props.history.push("/deliveries/" + id);
  };
  render() {
    const { data, type } = this.props;
    return (
      <div className="card-panel">
        <div className="collection">
          {data.map((tarea, index) => (
            <div
              className="collection-item"
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.toDelivery(tarea.id);
              }}
              key={index}
            >
              {tarea.name}
            </div>
          ))}
          {type === 2 && (
            <Modal
              header="Agregar entrega"
              actions={
                <div>
                  <Button
                    flat
                    modal="close"
                    waves="light"
                    onClick={this.closeModal}
                  >
                    Close
                  </Button>
                  <Button
                    flat
                    modal="close"
                    waves="light"
                    onClick={this.saveTask}
                  >
                    Accept
                  </Button>
                </div>
              }
              trigger={
                <a className="collection-item grey-text text-lighten-1">
                  Agregar Entrega
                </a>
              }
            >
              <Row>
                <Input
                  placeholder="Nombre"
                  s={12}
                  label="Nombre"
                  id="nombre"
                  name="nombre"
                  value={this.state.nombre}
                  onChange={this.handler}
                />
                <Input
                  placeholder="Descripción"
                  s={12}
                  label="Descripción"
                  id="descripcion"
                  name="descripcion"
                  value={this.state.descripcion}
                  onChange={this.handler}
                />
                <label htmlFor="fecha">Fecha de entrega</label>
                <input
                  s={6}
                  label="fecha de entrega"
                  type="date"
                  placeholder="fecha"
                  name="fecha"
                  id="fecha"
                  value={this.state.fecha}
                  onChange={this.handler}
                />
              </Row>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Delivery);
