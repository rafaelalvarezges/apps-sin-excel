import logo from './logo.svg';
import './App.css';
import React from "react";
import {List} from "./components/List/List";
import Nav from './components/nav/Nav';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <List></List>
    </div>
  );
}

export default App;
