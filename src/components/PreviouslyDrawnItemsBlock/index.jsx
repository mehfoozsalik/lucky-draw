import React from "react"
import { Card } from "tabler-react"
import "./style.css"

const PreviouslyDrawnItemsBlock = (props) => (
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
                  <div className='row-table-name'>Name: {item.Customer}</div>
                  <div className='row-table-id'>Coupon ID: {item.CouponID}</div>
                  <hr />
                </div>
              ))}
        </div>
      </div>
    }
  />
)

export default PreviouslyDrawnItemsBlock
