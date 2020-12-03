import logo from './logo.svg';
import TablaClientes from './components/tablaClientes/TablaClientes';
import Nav from './components/nav/Nav';
import Tabla from './components/tabla/Tabla';
import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        
        <Switch>
          
          <Route path="/">
            <Nav
              title="Listado de usuarios sin código estadístico"
            />
            <TablaClientes />
          </Route>

        </Switch>
        
      </div>
    </BrowserRouter>
  );
}


export default App;