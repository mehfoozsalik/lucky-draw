import "tabler-react/dist/Tabler.css"
import "./App.css"
import * as React from "react"
import Home from "./pages/home/Home"
import Copyright from "./components/Copyright"
import logo from "./components/assests/logo.png"
import upload from "./components/assests/upload.png"

function App() {
  return (
    <div className='app'>
      <div className='main'>
        <div>
          <img className='logo' src={logo} alt='' />
        </div>
        <div className='upload'>
          <img className='upload-img' src={upload} alt='' />
          <span>Upload CSV</span>
        </div>
      </div>
      <Home />
      <Copyright />
    </div>
  )
}

export default App
