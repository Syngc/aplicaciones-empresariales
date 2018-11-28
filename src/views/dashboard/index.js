import React from "react";
import { withRouter, Redirect } from "react-router-dom";
//Components
import Nav from "../../components/nav";
import Groups from "../../components/groups";
import { Tabs, Tab } from "react-materialize";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: []
    };
  }
  beforeLogin() {
    if (this.props.beforeLogin()) {
      return <Redirect to={"/login"} />;
    } else {
      return null;
    }
  }
  render() {
    return (
      <div className="view">
        {this.beforeLogin()}
        <header>
          <Nav logout={this.props.logout} />
        </header>
        <main>
          <h1 className="float-left title-font"> </h1>
          <Tabs className="tab-demo z-depth-1">
            <Tab className="comet-text" title="Clases" active>
              {" "}
              <Groups />
            </Tab>
          </Tabs>
        </main>
      </div>
    );
  }
}

export default withRouter(Dashboard);
