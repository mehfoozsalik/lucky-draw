import "tabler-react/dist/Tabler.css"
import "./App.css"
import React, { Component } from "react"
import Home from "./pages/home/Home"
import Copyright from "./components/Copyright"
import { CSVReader } from "react-papaparse"
import logo from "./components/assests/logo.png"
const buttonRef = React.createRef()
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prompt: false,
      items: [],
    }
  }

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data) => {
    console.log("---------------------------")

    this.setState({
      items: data,
      prompt: true,
    })
    console.log("---------------------------")
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log("---------------------------")
    console.log(err)
    console.log("---------------------------")
  }

  handleOnRemoveFile = (data) => {
    console.log("---------------------------")
    console.log(data)
    console.log("---------------------------")
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  render() {
    return (
      <div className='app'>
        <div className='main'>
          <div>
            <img className='logo' src={logo} alt='' />
          </div>
          <CSVReader
            ref={buttonRef}
            onFileLoad={this.handleOnFileLoad}
            onError={this.handleOnError}
            noClick
            noDrag
            onRemoveFile={this.handleOnRemoveFile}>
            {({ file }) => (
              <aside
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "10rem",
                  height: "100%",
                  marginTop: "2rem",
                  marginRight: "2rem",
                  textAlign: "center",
                }}>
                Upload CSV and then Press Red Button
                <button
                  type='button'
                  onClick={this.handleOpenDialog}
                  style={{
                    borderRadius: "1rem",
                    marginLeft: 0,
                    marginRight: 0,
                    width: "100%",
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}>
                  Browse file
                </button>
                <div
                  style={{
                    borderWidth: 1,
                    borderRadius: "1rem",
                    borderStyle: "solid",
                    borderColor: "#eee",
                    height: 45,
                    lineHeight: 2.5,
                    marginTop: 5,
                    marginBottom: 5,
                    paddingLeft: 13,
                    paddingTop: 3,
                    width: "100%",
                  }}>
                  {file && file.name}
                </div>
                <button
                  style={{
                    borderColor: "#eee",
                    borderRadius: "1rem",
                    marginLeft: 0,
                    marginRight: 0,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                  onClick={this.handleRemoveFile}>
                  Remove
                </button>
              </aside>
            )}
          </CSVReader>
        </div>
        <Home file={this.state.items} prompt={this.state.prompt} />
        <Copyright />
      </div>
    )
  }
}
