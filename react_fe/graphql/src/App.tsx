import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import axios from "axios";
import {QueriesHello} from "./QueriesHello/QueriesHello";
import {QueriesAccount} from "./QueriesAccount/QueriesAccount";


function App() {
  return (
    <div className="App">
      <QueriesHello/>
        <QueriesAccount/>
    </div>
  );
}

export default App;
