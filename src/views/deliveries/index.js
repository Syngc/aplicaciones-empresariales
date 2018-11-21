import React from "react";
import Nav from "../../components/nav";
import { withRouter } from "react-router-dom";
import Students from "../../components/students";
import { Tabs, Tab } from "react-materialize";
import { cloud } from "../../firebase/cloud";
import { Button, Row } from "react-materialize";
import Alert from "react-s-alert";
import Select from "../../components/entregas/repositoryList"

import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
class Deliveries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      usertype: "",
      taskInfo: {},
      classInfo: {},
      students: [],
      repository: '',
      modalIsOpen: false,
      repositories: []
    };
  }
  async componentDidMount() {
    let user = await cloud.getUser();
    this.setState(
      {
        usertype: user.type
      },
      () => {
        this.validateTask();
        if(user.type===1){
          this.getRepositories()
        }
      }
    );
  }
  handler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handlerSelect = e => {
    this.setState({
      repository: e.value
    })
  }
  getRepositories = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    let repoUrl = user.additionalUserInfo.profile.repos_url
    let that = this
    fetch(repoUrl).then(res => res.json()).then((res)=>{
      that.setState({
        repositories: res
      })
    })
  } 
  closeModal = () => {
    this.setState({
      repository: "",
      modalIsOpen: false
    });
  };
  validateTask = async () => {
    let result = await cloud.validateTask(this.state.id);
    this.setState(
      {
        taskInfo: result
      },
      () => {
        this.getStudents();
      }
    );
    result = await cloud.validateClass(this.state.taskInfo.classId);
    if (result.deleted === 1) {
      window.location.href = "/home";
    }
    this.setState({
      classInfo: result
    });
    let user = localStorage.getItem("user");
    let validation;
    if (this.state.usertype === 2) {
      validation = result.teachers[JSON.parse(user).user.uid];
    } else {
      validation = result.students[JSON.parse(user).user.uid];
    }
    if (!validation) {
      window.location.href = "/home";
    }
  };
  getStudents = async () => {
    let current = await cloud.getStudents(this.state.taskInfo.classId);
    let deliverylist = await cloud.getDeliverables(this.state.id, current);
    this.setState({
      students: deliverylist
    });
  };
  addDeliverable = async () => {
    if (this.state.repository !== "") {
      let result = await cloud.createDeliverable(
        this.state.id,
        this.state.repository
      );
      if (result.status === "created") {
        this.closeModal();    
        Alert.info("Su entrega fue enviada", {
          position: "bottom-right",
          effect: "slide",
          timeout: "none"
        });
      } else {
        Alert.error(result.error, {
          position: "bottom-right",
          effect: "slide",
          timeout: "none"
        });
      }
    } else {
      Alert.error("Debe ingresar un repositorio", {
        position: "bottom-right",
        effect: "slide",
        timeout: "none"
      });
    }
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };
  render() {
    return (
      <div className="view">
        <Alert stack={{ limit: 3 }} />
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Row>
            <Select repos={this.state.repositories} value={this.state.repositoy} handler={this.handlerSelect}/>
            <div style={{ width: "100%", textAlign: "right" }}>
              <Button flat onClick={this.closeModal}>
                Cancelar
              </Button>
              <Button flat onClick={this.addDeliverable}>
                Agregar
              </Button>
            </div>
          </Row>
        </Modal>
        <header>
          <Nav logout={this.props.logout} />
        </header>
        <main>
          <h1 className="float-left title-font"> </h1>
          <Tabs className="tab-demo z-depth-1">
            <Tab title="Informacion" active>
              <div className="row">
                <div className="col s12 m12">
                  <div className="card-panel ">
                    <p className="row">NOMBRE: {this.state.taskInfo.name}</p>
                    <p className="row ">
                      DESCRIPCIÓN:<br />
                      {this.state.taskInfo.description}
                    </p>
                    <div className="form-group row">
                      <label
                        htmlFor="example-date-input"
                        className="col-2 col-form-label"
                      >
                        Fecha de entrega :{this.state.taskInfo.date}
                      </label>
                    </div>
                    {this.state.usertype === 1 && (
                      <Button className="celerian" onClick={this.openModal}>
                        Agregar entrega
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Tab>
            <Tab title="Entregas">
              <Students
                estudiantes={this.state.students}
                type={this.state.usertype}
                id={this.state.id}
                refresh={this.getStudents}
              />
            </Tab>
          </Tabs>
        </main>
      </div>
    );
  }
}

export default withRouter(Deliveries);
