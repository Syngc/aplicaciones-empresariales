//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

//App
import App from './App';

//Assets
import './index.css';


ReactDOM.render(
<Router>
    <App></App>
</Router>, 
document.getElementById('root'));
