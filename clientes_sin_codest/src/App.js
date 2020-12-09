import TablaClientes from './components/tablaClientes/TablaClientes';
import Nav from './components/nav/Nav';
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import socketIOClient from "socket.io-client";

function App() {

  const [usrs, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient();
    socket.on("usuarios", data => {
      setResponse(data);
    });
  }, []);



  return (
    <BrowserRouter>
      <div>
        <Switch>

          <Route path="/">
            <Nav
              title="Listado de usuarios sin código estadístico"
            />
            <TablaClientes
              conexiones={usrs}
            />
          </Route>

        </Switch>
       
      </div>
    </BrowserRouter>
  );
}


export default App;
