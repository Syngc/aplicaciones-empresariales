import React from "react"
import Modal from 'react-modal'
import {withRouter} from 'react-router'
import New from './new'
import {cloud} from '../../firebase/cloud'
import Loader from 'react-loader-spinner'
import Alert from 'react-s-alert';
 
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
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
Modal.setAppElement('#root')
class Groups extends React.Component { 
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      code: '',
      name: '',
      classes: [],
      usertype: '',
      loader: true,
      nueva: false,
      one: false,
      err: false,
      msg: ''
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  async componentDidMount(){
    let user = await cloud.getUser()
    if(user){
    this.setState({
      usertype: user.type
    }, () => {
      this.getClasses()
    })
    }
  }
  handler = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({
      [e.target.name]: value
    })
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  getClasses = async () => {
    let classes = []
    let one = true
    if(this.state.usertype === 1){
      classes = await cloud.getClassesStudents()
    } else {
      classes = await cloud.getClassesTeachers()
      one = false
    }
    this.setState({
      classes: classes,
      loader: false,
      one: one
    })
  }
  closeModal() {
    this.setState({
      modalIsOpen: false,
      code: '',
      name: '',
      err: false,
      msg:''
    });
  }
  createClass = async (e) => {    
    e.preventDefault()
    const {
      code,
      name,
      nueva,
      one
    } = this.state
    if(one){
      let result = await cloud.enrollStudent(code) 
      if(result.status==='created'){
          this.closeModal()
          Alert.info('Su solicitud fue enviada', {
            position: 'bottom-right',
            effect: 'slide',
            timeout: 'none'
          })
        } else {
          this.setState({
            err: true,
            msg: result.error
          })
        }
    } else {
      if(nueva){
        let result = await cloud.createClass(name, code)
        if(result.status==='created'){
          this.closeModal()
          this.getClasses()
        } else {
          this.setState({
            err: true,
            msg: result.error
          })
        }
      } else {
        let result = await cloud.enrollTeacher(code)
        if(result.status==='created'){
            this.closeModal()  
            Alert.info('Su solicitud fue enviada', {
              position: 'bottom-right',
              effect: 'slide',
              timeout: 'none'
            })
        } else {
          this.setState({
            err: true,
            msg: result.error
          })
       }
      }
    }
  }
  taskPage = (id) => {
    this.props.history.push('/tasks/'+id)
  }
  render() {
    return (
      <div>
      <Alert stack={{limit: 3}} /> 
         <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
         <New code={this.state.code} name={this.state.name} handler={this.handler} cancel={this.closeModal} create={this.createClass} one={this.state.one} nueva={this.state.nueva} err={this.state.err} msg={this.state.msg}/> 
        </Modal>
        <div className="row">
          <div className="col s12 m12">
            <div className="card-panel ">
            <div className="row">
              {
                this.state.loader ? (   
                  <div className="col s2 m2">
                    <div className="card light-green accent-2">
                      <div className="card-content  blue-grey-text text-darken-3">
                        <Loader type="Circles" color="#4caf50" height={80} width={80}/>
                      </div>
                    </div>
                  </div>
                ) : (
                  this.state.classes.map((data, index) => (
                    <div className="col s2 m2" key={index}>
                      <div className="card light-green accent-2" onClick={() => this.taskPage(data.id)}>
                        <div className="card-content  blue-grey-text text-darken-3">
                          <span className="card-title">
                            {data.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )
              }
              <div className="col s2 m2">
                  <div className="card light-green accent-2" onClick={this.openModal}>
                    <div className="card-content  blue-grey-text text-darken-3">
                      <span className="card-title">
                        Nueva clase
                      </span>
                    </div>
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

export default withRouter (Groups)