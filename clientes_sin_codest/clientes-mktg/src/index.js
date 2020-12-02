import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// Componentes
import TablaClientes from './components/tablaClientes/TablaClientes';
import Nav from './components/nav/Nav';
import Tabla from './components/tabla/Tabla';
import App from './App';

ReactDOM.render(
  <React.Fragment>
    <App /> 
  </React.Fragment>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();