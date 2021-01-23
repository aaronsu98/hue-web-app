import './App.css';
import React, {useEffect, useReducer} from "react";
import ReactDOM from 'react-dom';
import Body from './components/Body.js'

function Header({ name }) { // object destructuring, takes apart props and gets the name from it
  return (
    <header>
      <h1>{name} Smart Home Control</h1>
    </header>
  )
}

function Footer() {
  return( 
    <footer>
      <p>Made by Aaron Su</p>
    </footer>
  )
}

function App() {
  fetchLights();
  return (
    <div className="App">
      <Header name="Aaron" />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
