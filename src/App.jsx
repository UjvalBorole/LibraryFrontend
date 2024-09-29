import { useState } from 'react'
import './index.css';
import { Outlet } from "react-router-dom";
import {Navbar} from "./component/Navbar";
import {Footer} from "./component/Footer";
import {Login}from "./Pages/Auth/Login"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default App
