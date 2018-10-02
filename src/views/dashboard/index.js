import React from "react";
import { withRouter, Redirect} from "react-router-dom";
//Components
import Nav from '../../components/nav'
import Groups from '../../components/groups'


class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      classes: []
    }
  }
  async componentDidMount(){
    let user = await this.props.cloud.getUser()
    console.log(user)
  }
  beforeLogin(){
    if(this.props.beforeLogin()){
      return (
        <Redirect to={'/login'} />
      )
    } else {
      return null
    }
  }
  render() {
    let newClass = {
      nombre : "Crear nueva clase",
    }
    return (
      <div className="dashboard">
        {
          this.beforeLogin()
        }
        <Nav></Nav>
        <div className="container h-100">
        <h1 className="float-left">Clases</h1>
          <h2 className="float-right"> + </h2>
           
            <Groups classes={this.state.classes}></Groups>
          </div>        
      </div>
    );
  }
}

export default withRouter(Dashboard);
