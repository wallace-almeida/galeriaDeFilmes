import React from "react";
import Routes from "./routes";
import './styles.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className= "app">
      <Routes/>
      <ToastContainer autoClose= {3000}/>
    </div>
  );
}

export default App;
