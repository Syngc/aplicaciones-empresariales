

import React from "react";
import './card.css'

class Card extends React.Component {
  
  render() {
    let style = require('./card.css')
    let data = this.props.data
    return (
        <div className="col-sm-2">
         <div className="card card-style" >
            <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
            </div>
          </div>
        </div>
    );
  }
}

export default Card;
