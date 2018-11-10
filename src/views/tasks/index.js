import React from "react";
import {withRouter} from 'react-router-dom'
import {cloud} from '../../firebase/cloud'
import Nav from "../../components/nav";
import Delivery from "../../components/delivery";
import {Tabs, Tab} from "react-materialize";
import Miembros from "../../components/miembros" 
import Solicitudes from "../../components/solicitudes" 
import Informacion from "../../components/informacion" 
import Alert from 'react-s-alert';
 
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
 

class Tasks extends React.Component {
  constructor (props){
    super(props)
    this.state={
      id: props.match.params.id,
      usertype: '',
      classInfo: {},
      tasks: [],
      students: [],
      pendingStudents: [],
      teachers: [],
      pendingTeachers: []
    } 
  } 
  async componentDidMount(){
    let user = await cloud.getUser()
    this.setState({
      usertype: user.type
    }, () => {
      this.validateClass()
    })
  }
  validateClass = async () => {
    let result = await cloud.validateClass(this.state.id)
    this.setState({
      classInfo: result
    })
    let user = localStorage.getItem('user')
    let validation
    if(this.state.usertype===2){
      validation = result.teachers[JSON.parse(user).user.uid]
    } else {
      validation = result.students[JSON.parse(user).user.uid]
    }
    if(!validation){
      window.location.href = '/home' 
    } else {
      this.getTasks()
      this.getStudents()
      this.getTeachers()
    }
  }
  getTasks = async () => {
    let tasks = await cloud.getTasks(this.state.id)
    this.setState({
      tasks: tasks
    })
  }
  getStudents = async () => {
    let result = await cloud.getEnrolledStudents(this.state.id)
    let current = await cloud.getStudents(this.state.id)
    this.setState({
      pendingStudents: result,
      students: current
    })
  }
  getTeachers = async () => {
    let result = await cloud.getEnrolledTeachers(this.state.id)
    let current = await cloud.getTeachers(this.state.id)
    this.setState({
      pendingTeachers: result,
      teachers: current
    })
  }
  acceptStudent = async (uid) => {
    let result = await cloud.acceptStudentEnroll(this.state.id, uid)
    if(result.status==='ok'){
      this.getStudents()
    } else {
      Alert.error(result.error, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      })
    }
  }
  acceptTeacher = async (uid) => {
    let result = await cloud.acceptTeacherEnroll(this.state.id, uid)
    if(result.status==='ok'){
      this.getTeachers()
    } else {
      Alert.error(result.error, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      })
    }
  }
  rejectStudent = async (uid) => {
    let result = await cloud.rejectStudentEnroll(this.state.id, uid)
    if(result.status==='ok'){
      this.getStudents()
    } else {
      Alert.error(result.error, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      })
    }
  }  
  rejectTeacher = async (uid) => {
    let result = await cloud.rejectTeacherEnroll(this.state.id, uid)
    if(result.status==='ok'){
      this.getTeachers()
    } else {
      Alert.error(result.error, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      })
    }
  }  
  deleteStudent = async (uid) => {
    let result = await cloud.deleteStudent(this.state.id, uid)
    if(result.status==='ok'){
      this.getStudents()
    } else {
      Alert.error(result.error, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      })
    }
  }   
  deleteTeacher = async (uid) => {
    let result = await cloud.deleteTeacher(this.state.id, uid)
    if(result.status==='ok'){
      this.getTeachers()
    } else {
      Alert.error(result.error, {
        position: 'bottom-right',
        effect: 'slide',
        timeout: 'none'
      })
    }
  }  
  render() {
    return (
      <div className="view"> 
      <Alert stack={{limit: 3}} /> 
        <header> 
          <Nav logout={this.props.logout}></Nav>
        </header> 
        <main>
          <h1 className="float-left title-font"> </h1>
          <Tabs className='tab-demo z-depth-1'>
            <Tab title="Entregas" active> <Delivery data={this.state.tasks} getTasks={this.getTasks} id={this.state.id}/></Tab>
            <Tab title="Miembros" ><Miembros students={this.state.students} teachers={this.state.teachers} deleteStudents={this.deleteStudent} deleteTeachers={this.deleteTeacher}/></Tab>
            <Tab title="Información"><Informacion classInfo={this.state.classInfo}/></Tab>
            <Tab title={this.state.usertype === 2 ? 'Solicitudes' : ''} disabled={this.state.usertype !== 2}><Solicitudes students={this.state.pendingStudents} teachers={this.state.pendingTeachers} id={this.state.id} rejectStudent={this.rejectStudent} rejectTeacher={this.rejectTeacher} acceptStudent={this.acceptStudent} acceptTeacher={this.acceptTeacher}/> </Tab>
        </Tabs>
        </main>
      </div>
    );
  }
}

export default withRouter(Tasks);
