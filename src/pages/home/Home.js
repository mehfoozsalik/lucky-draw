import "tabler-react/dist/Tabler.css"
import { Grid } from "tabler-react"
import React, { Component } from "react"
import PreviouslyDrawnItemsBlock from "../../components/PreviouslyDrawnItemsBlock"
import TextLoop from "react-text-loop"
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      currentItems: [],
      pastDrawnItems: [],
      previousDrawnCheck: [],
      result: "",
      winerName: "",
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
  // componentDidUpdate() {
  //   if (
  //     this.state.currentItems.length ===
  //     this.state.previousDrawnCheck.length < 1
  //   ) {
  //     this.setState({
  //       showResult: false,
  //       disableDrawButton: true,
  //     })
  //   }
  // }
  static getDerivedStateFromProps(props, state) {
    if (props.file) {
      const newfiles = props.file.map((i) => {
        return (i.data[0] = i.data[0].slice(0, 17))
      })
      return {
        items: newfiles,
        currentItems: newfiles,
      }
    } else {
      return {
        items: this.state.items,
        currentItems: this.state.currentItems,
      }
    }
  }
  removePastDrawn = () => {
    this.setState({
      pastDrawnItems: [],
    })
  }
  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
  randomDrawItem = () => {
    const {
      currentItems,
      showTextAnimation,
      removeDrawnItem,
      previousDrawnCheck,
    } = this.state
    this.setState({
      ...this.state,
      showResult: false,
      disableDrawButton: true,
    })

    let maxItemIndex = currentItems.length
    let min = 1
    let randomIndex
    let p
    do {
      let number = Math.floor(Math.random() * (maxItemIndex - min + 1)) + min
      p = previousDrawnCheck.includes(number)
      if (!p) {
        previousDrawnCheck.push(number)
        randomIndex = number
      }
    } while (p)
    const [newdatata] = this.props.file.filter((i) => {
      return currentItems[randomIndex] === i.data[0]
    })

    if (this.state.items[0] || newdatata?.data[1]) {
      this.sleep(showTextAnimation ? 3000 : 0).then(() => {
        this.setState({
          ...this.state,
          result: currentItems[randomIndex],
          winerName: newdatata?.data[1],
          pastDrawnItems: [...this.state.pastDrawnItems, newdatata],
          showResult: true,
          disableDrawButton: false,
        })
      })
    } else {
      this.setState({
        ...this.state,
        result: [],
        pastDrawnItems: [],
        showResult: false,
        disableDrawButton: false,
      })
    }
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
        <div>
          <h2
            className={
              showResult ? "winner-name" : "winner-name winner-name-off"
            }>
            {this.state.winerName}
          </h2>
        </div>
        {/* <video src={bgVedio} loop className='bgvedio' autoPlay /> */}
        <Grid.Col className='drawing-block'>
          <div className='drawing'>
            <div className='draw-section'>
              <div className='rotatingMachine'>
                {this.props.prompt ? (
                  <div>
                    {!showResult && (
                      <TextLoop
                        className='draw-text'
                        interval={100}
                        springConfig={{ stiffness: 180, damping: 8 }}
                        children={items}
                      />
                    )}
                    {showResult && result}
                  </div>
                ) : (
                  <div>Please Upload file</div>
                )}
              </div>
            </div>

            <button
              pill
              block
              name='drawButton'
              className='drawing-btn'
              onClick={disableDrawButton || !items ? " " : this.randomDrawItem}>
              {disableDrawButton || !items ? "Wait" : "Press"}
            </button>
          </div>

          <div className='table-prev'>
            <PreviouslyDrawnItemsBlock
              pastDrawnItems={pastDrawnItems}
              removePastDrawn={this.removePastDrawn}
            />
          </div>
        </Grid.Col>
      </div>
    )
  }
}

export default App
