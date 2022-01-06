import "./Home.css"
import "tabler-react/dist/Tabler.css"

import { Grid } from "tabler-react"
import React, { Component } from "react"
import PreviouslyDrawnItemsBlock from "../../components/PreviouslyDrawnItemsBlock"
import TextLoop from "react-text-loop"
import data from "../../JSON/luckdraw.json"
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [],
      currentItems: [],
      pastDrawnItems: [],
      result: "",
      name: "",
      showTextAnimation: true,
      removeDrawnItem: false,
      animationInterval: 150,
      showResult: false,
      disableDrawButton: false,
      isEmpty: false,
      value: "",
      valid: false,
      touched: false,
      validationRules: {
        minLength: 3,
        isRequired: true,
      },
    }
  }
  static getDerivedStateFromProps(props, state) {
    const newfiles = props.file.map((i) => {
      return (i.data[0] = i.data[0].slice(0, 17))
    })
    return {
      items: newfiles,
      currentItems: newfiles,
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props.file)
  //   if (nextProps.file !== this.props.file) {
  //     const newfiles = this.props.file.map((i) => {
  //       return (i.data[0] = i.data[0].slice(0, 17))
  //     })
  //     this.setState({ ...this.state, items: newfiles, currentItems: newfiles })
  //   }
  // }

  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
  randomDrawItem = () => {
    const { currentItems, showTextAnimation, removeDrawnItem } = this.state
    this.setState({
      ...this.state,
      showResult: false,
      disableDrawButton: true,
    })
    if (currentItems.length <= 0) {
      const copyCurrentItems = [...this.state.currentItems]
      copyCurrentItems.splice(randomIndex, 1)
      this.setState({
        currentItems: copyCurrentItems,
      })
    }

    let maxItemIndex = currentItems.length
    const randomIndex = Math.floor(Math.random() * (maxItemIndex - 1 + 1) + 1)
    const [newdatata] = this.props.file.filter((i) => {
      return currentItems[randomIndex] === i.data[0]
    })
    this.sleep(showTextAnimation ? 3000 : 0).then(() => {
      this.setState({
        ...this.state,
        result: currentItems[randomIndex],
        pastDrawnItems: [...this.state.pastDrawnItems, newdatata],
        showResult: true,
        disableDrawButton: false,
      })
    })
    if (removeDrawnItem) {
      const copyCurrentItems = [...this.state.currentItems]
      copyCurrentItems.splice(randomIndex, 1)
      this.setState({
        currentItems: copyCurrentItems,
      })
    }
  }

  render() {
    const { items, result, disableDrawButton, pastDrawnItems, showResult } =
      this.state

    return (
      <div className='draw-block'>
        {/* <video src={bgVedio} loop className='bgvedio' autoPlay /> */}

        <Grid.Col className='drawing-block'>
          <div className='drawing'>
            <div className='draw-section'>
              <div className='rotatingMachine'>
                {!showResult && items && (
                  <TextLoop
                    className='draw-text'
                    interval={100}
                    springConfig={{ stiffness: 180, damping: 8 }}
                    children={this.props.prompt ? items : "upload the file"}
                  />
                )}

                {showResult && result}
              </div>
            </div>

            <button
              pill
              block
              name='drawButton'
              className='drawing-btn '
              onClick={disableDrawButton ? " " : this.randomDrawItem}>
              {disableDrawButton ? "Wait" : "Press"}
            </button>
          </div>

          <div className='table-prev'>
            <PreviouslyDrawnItemsBlock pastDrawnItems={pastDrawnItems} />
          </div>
        </Grid.Col>
      </div>
    )
  }
}

export default App
