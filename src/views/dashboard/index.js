import React from "react";
import { withRouter, Redirect} from "react-router-dom";
//Components
import Nav from "../../components/nav";
import Groups from "../../components/groups";
import {Tabs, Tab} from "react-materialize";


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
    let data = require("../../data.json");
    let classes = data.classes;
    console.log(classes);

    let newClass = {
      nombre: "Crear nueva clase"
    };
    return (
      <div className="view">
	{
	  this.beforeLogin()
	}
        <header> 
          <Nav></Nav>
        </header>
        <main>
        <h1 className="float-left title-font"></h1>
        <Tabs className='tab-demo z-depth-1'>
          <Tab title="Clases" active>  <Groups classes={this.state.classes} /></Tab>
        </Tabs>         
        </main>
      </div>
    );
  }
}

export default withRouter(Dashboard);
