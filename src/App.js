import "tabler-react/dist/Tabler.css"
import React, { Component } from "react"
import Home from "./pages/home/Home"
import Copyright from "./components/Copyright"
import { CSVReader } from "react-papaparse"
import logo from "./components/assests/logo.png"
import refImage from "./components/assests/refImage.jpg"

const buttonRef = React.createRef()
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prompt: false,
      items: [],
      showImage: false,
    }
  }

  handleImage = () => {
    this.setState({
      showImage: true,
    })
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
    this.setState({
      items: [],
      prompt: false,
    })
    console.log("---------------------------")
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
      this.setState({
        items: [],
        prompt: false,
      })
    }
  }

  render() {
    return (
      <div className='app'>
        <div
          className={
            this.state.showImage
              ? "refImage-container"
              : "refImage-container refImage-container-off"
          }>
          <div style={{ position: "relative" }}>
            <img src={refImage} alt='' className='refImage' />
            <svg
              onClick={() => {
                this.setState({
                  showImage: false,
                })
              }}
              width='56'
              height='56'
              viewBox='0 0 56 56'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <circle cx='28' cy='28' r='28' fill='white' />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M26.5459 27.96L17 37.5059L18.4141 38.9199L27.96 29.374L37.5059 38.9204L38.9199 37.5059L29.374 27.96L38.9199 18.4141L37.5059 17L27.96 26.5459L18.4141 17L17 18.4141L26.5459 27.96Z'
                fill='#1B1B1B'
              />
            </svg>
          </div>
        </div>
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
              <aside className='aside-upload'>
                <p>Upload CSV and then Press Red Button</p>
                <div className='div-upload'>
                  <button
                    className='btn-fileupload aside-upload'
                    onClick={this.handleImage}>
                    <svg
                      width='64'
                      height='80'
                      viewBox='0 0 64 80'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M42 0H8C3.6 0 0.0400009 3.6 0.0400009 8L0 72C0 76.4 3.56 80 7.96 80H56C60.4 80 64 76.4 64 72V22L42 0ZM58 74H6V6H38V26H58V50V74Z'
                        fill='#0059AB'
                      />
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M32 68C40.8369 68 48 60.8364 48 52C48 43.1636 40.8369 36 32 36C23.1631 36 16 43.1636 16 52C16 60.8364 23.1631 68 32 68ZM29.7578 55.5825H33.2441C33.2529 54.8809 33.3486 54.2744 33.5312 53.7642C33.7227 53.2539 34.0781 52.7661 34.5977 52.3013C35.1992 51.7363 35.751 51.1895 36.252 50.6606C36.4482 50.4531 36.6299 50.2397 36.7969 50.0195C37.0566 49.6787 37.2803 49.3228 37.4688 48.9517C37.7783 48.332 37.9336 47.6255 37.9336 46.8325C37.9336 45.6934 37.6924 44.7271 37.209 43.9341C36.7256 43.1318 36.0283 42.5259 35.1172 42.1157C34.2061 41.6963 33.1123 41.4868 31.8359 41.4868C30.6787 41.4868 29.6348 41.6875 28.7051 42.0884C27.7754 42.4805 27.0322 43.0864 26.4766 43.9067C25.9297 44.7178 25.6426 45.748 25.6152 46.9966H29.5801C29.5889 46.4316 29.6982 45.9756 29.9082 45.6294C30.127 45.2832 30.4053 45.0278 30.7422 44.8638C30.9766 44.7432 31.2246 44.6646 31.4854 44.6279C31.5996 44.6118 31.7168 44.604 31.8359 44.604C32.3096 44.604 32.7021 44.6953 33.0117 44.8774C33.3311 45.0596 33.5674 45.3286 33.7227 45.6841C33.8867 46.0303 33.9688 46.4678 33.9688 46.9966C33.9688 47.2388 33.9434 47.4692 33.8916 47.688C33.8467 47.8813 33.7812 48.0654 33.6953 48.2407C33.5127 48.6055 33.2627 48.9609 32.9434 49.3071C32.624 49.6533 32.251 50.0181 31.8223 50.4009C31.3115 50.875 30.9014 51.3535 30.5918 51.8364C30.291 52.3193 30.0771 52.8618 29.9492 53.4634C29.8311 54.0557 29.7666 54.7622 29.7578 55.5825ZM29.9492 58.3579C29.5479 58.7407 29.3477 59.2236 29.3477 59.8071C29.3477 60.3721 29.5479 60.8506 29.9492 61.2427C30.3506 61.6348 30.8877 61.8306 31.5625 61.8306C32.2275 61.8306 32.7607 61.6348 33.1621 61.2427C33.5723 60.8506 33.7773 60.3721 33.7773 59.8071C33.7773 59.2236 33.5723 58.7407 33.1621 58.3579C32.7607 57.9658 32.2275 57.77 31.5625 57.77C30.8877 57.77 30.3506 57.9658 29.9492 58.3579Z'
                        fill='#0059AB'
                      />
                    </svg>
                  </button>
                  <button
                    type='button'
                    onClick={this.handleOpenDialog}
                    className='btn-fileupload aside-upload'>
                    <svg
                      width='64'
                      height='80'
                      viewBox='0 0 64 80'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M42 0H8C3.6 0 0.0400009 3.6 0.0400009 8L0 72C0 76.4 3.56 80 7.96 80H56C60.4 80 64 76.4 64 72V22L42 0ZM58 74H6V6H38V26H58V74ZM16 52.04L21.64 57.68L28 51.36V68H36V51.36L42.36 57.72L48 52.04L32.04 36L16 52.04Z'
                        fill='#0059AB'
                      />
                    </svg>
                  </button>
                  <div className='display-fileupload'>{file && file.name}</div>
                  <button
                    className='btn-fileupload'
                    onClick={this.handleRemoveFile}>
                    <svg
                      width='64'
                      height='80'
                      viewBox='0 0 64 80'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fill-rule='evenodd'
                        clip-rule='evenodd'
                        d='M8 0H42L64 22V72C64 76.4 60.4 80 56 80H7.96C3.56 80 0 76.4 0 72L0.0400009 8C0.0400009 3.6 3.6 0 8 0ZM6 6V74H58V50V26H38V6H6ZM16 52C16 43.168 23.168 36 32 36C40.832 36 48 43.168 48 52C48 60.832 40.832 68 32 68C23.168 68 16 60.832 16 52ZM22 55.6H42V48.4H22V55.6Z'
                        fill='#0059AB'
                      />
                    </svg>
                  </button>
                </div>
              </aside>
            )}
          </CSVReader>
        </div>
        <Home
          file={this.state.items}
          prompt={this.state.prompt}
          pastDrawnItems={this.state.pastDrawnItems}
        />
        <Copyright />
      </div>
    )
  }
}
