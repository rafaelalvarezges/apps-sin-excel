import logo from './logo.svg';
import TablaDevoluciones from './components/tablaDevoluciones/TablaDevoluciones';
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
              title="Devoluciones Documentadas"
            />
            <TablaDevoluciones />
          </Route>

        </Switch>
        
      </div>
    </BrowserRouter>
  );
}


export default App;
