import React from "react"
import { Card } from "tabler-react"
import "./style.css"

const PreviouslyDrawnItemsBlock = (props) => {
  console.log(props.pastDrawnItems)
  return (
    <Card
      title='Winner Annoucement'
      className='past-drawn-block'
      body={
        <div className='table'>
          <div className='main-table'>
            {props.pastDrawnItems.length === 0
              ? "No previous item."
              : props.pastDrawnItems.map((item, index) => (
                  <div className='row-table' key={index}>
                    <div className='row-table-name'>Name: {item.data[0]}</div>
                    <div className='row-table-id'>
                      Coupon ID: {item.data[1]}
                    </div>
                    <hr />
                  </div>
                ))}
          </div>
        </div>
      }
    />
  )
}

export default PreviouslyDrawnItemsBlock
