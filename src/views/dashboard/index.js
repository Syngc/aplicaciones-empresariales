import React from "react";

//Components
import Nav from '../../components/nav'
import Card from '../../components/card'


class Dashboard extends React.Component {
  render() {
    let classes =
    [{
      title: "clase 1",
      description: "clase dea asas"
    },{
      title: "clase 2",
      description: "clase dea asas"
    },{
      title: "clase 3",
      description: "clase dea asas"
    },{
      title: "clase 4",
      description: "clase dea asas"
    },{
      title: "clase 5",
      description: "clase dea asas"
    },{
      title: "clase 6",
      description: "clase dea asas"
    },{
      title: "clase 7",
      description: "clase dea asas"
    }];

    let newClass = {
      title : "Crear nueva clase",
    }
    return (
      <div className="dashboard">
        <Nav></Nav>
        <div className="container h-100">
          <div class="row">
            <Card data={newClass}></Card>
            {classes.map(data => 
                <Card data={data}></Card>
            )}
          </div>
        </div>
        
      </div>
    );
  }
}

export default Dashboard;
