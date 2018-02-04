import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter'; 
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { GoogleMap } from "react-google-maps";
const google = window.google


ReactDOM.render(<AppRouter />, document.getElementById('root'));



registerServiceWorker();
