//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

//Routes
import AppRoutes from './routes';

//Assets
import './index.css';


ReactDOM.render(
<Router>
    <AppRoutes></AppRoutes>
</Router>, 
document.getElementById('root'));
