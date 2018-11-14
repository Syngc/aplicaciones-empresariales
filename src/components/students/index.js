import React from "react";

import {cloud} from '../../firebase/cloud'
import {Button, Row, Input} from 'react-materialize'
import Alert from 'react-s-alert';
 
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Modal from 'react-modal'
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
class Students extends React.Component {  
  constructor (props){
    super(props)
    this.state={
      score: '',
      modalIsOpen: false,
      currentId: ''
    } 
  }   
  closeModal = () => {
    this.setState({
      score: '',
      modalIsOpen: false
    })
  }  
  openModal = (id) => {
    this.setState({modalIsOpen: true, currentId: id});
  } 
  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  }
  updateDeliverable = async () => {
    if(this.state.score!==''){
      let result = await cloud.updateDeliverables(this.props.id, this.state.score, this.state.currentId)
      if(result.status==='ok'){
        this.closeModal()
        this.props.refresh()
      } else {
        Alert.error(result.error, {
          position: 'bottom-right',
          effect: 'slide',
          timeout: 'none'
        })
      }
    } else {
      Alert.error('Debe ingresar una calificación', {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      })
    }
  }
  handler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    let {
      estudiantes,
      type
    } = this.props;
    return (
      <div className="row">        
      <Alert stack={{limit: 3}} /> 
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >     
        <Row>
          <Input placeholder="Score" s={12} label="Score" id="score" name='score' value={this.state.score} onChange={this.handler}/>
          <div style={{width: '100%', textAlign: "right"}}>
            <Button flat onClick={this.closeModal}>
              Cancelar
            </Button>  
            <Button flat onClick={this.updateDeliverable}>
              Agregar
            </Button>
          </div>
        </Row>
       </Modal>
       <div className="col s12 m12">
        <div className="card-panel ">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Estudiante</th>
              <th scope="col">Repositorio</th>
              <th scope="col">Nota</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((estudiante, index) => (
              <tr key = {index}>
                <th scope="row">{estudiante.cc}</th>
                <td>
                  <a href={"http://" + estudiante.delivery.link}> {estudiante.delivery.link} </a>
                </td>
                <td>
                  {estudiante.delivery.score}          
                  <div style={{width: '40%', textAlign: 'right'}}>
                    {
                      type === 2 && (
                          <Button  onClick={() => this.openModal(estudiante.id)}>Editar nota</Button>
                      )
                    }
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
        </div>
    );
  }
}

export default Students;