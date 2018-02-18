import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routes/AppRouter'; 
import './index.css';
import '../node_modules/toastr/build/toastr.css';
import registerServiceWorker from './registerServiceWorker';

import { GoogleMap } from "react-google-maps";


ReactDOM.render(<AppRouter />, document.getElementById('root'));



registerServiceWorker();
