import "./Home.css"
import "tabler-react/dist/Tabler.css"
import bgVedio from "../../JSON/CouponNumber.mp4"
import { Grid } from "tabler-react"
import React, { Component } from "react"
import PreviouslyDrawnItemsBlock from "../../components/PreviouslyDrawnItemsBlock"
import TextLoop from "react-text-loop"
import data from "../../JSON/luckdraw.json"

class App extends Component {
  constructor(props) {
    const newfile = data.map((i) => {
      return (i.CouponID = i.CouponID.slice(0, 17))
    })

    super(props)
    this.state = {
      items: newfile,
      currentItems: newfile,
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
    const randomIndex = Math.floor(Math.random() * maxItemIndex)
    const newdatata = data.filter((i) => {
      return currentItems[randomIndex] === i.CouponID
    })
    console.log(newdatata)
    this.sleep(showTextAnimation ? 3000 : 0).then(() => {
      this.setState({
        ...this.state,
        result: currentItems[randomIndex],
        pastDrawnItems: [...this.state.pastDrawnItems, newdatata[0]],
        name: newdatata[0].Customer,
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
    const {
      items,
      result,
      newdatata,
      disableDrawButton,
      name,
      pastDrawnItems,
      showResult,
    } = this.state

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
                    children={items}
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
              onClick={disableDrawButton ? {} : this.randomDrawItem}>
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
