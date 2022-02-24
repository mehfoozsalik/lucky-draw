import React from "react"
import { Card } from "tabler-react"

const PreviouslyDrawnItemsBlock = ({ pastDrawnItems, removePastDrawn }) => {
  return (
    <div
      style={{
        position: "relative",
      }}>
      <button className='clear-btn' onClick={removePastDrawn}>
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M16 0C7.168 0 0 7.168 0 16C0 24.832 7.168 32 16 32C24.832 32 32 24.832 32 16C32 7.168 24.832 0 16 0ZM26 19.6H6V12.4H26V19.6Z'
            fill='#0059AB'
          />
        </svg>
        <span>Clear</span>
      </button>
      <Card
        title='Winner Annoucement'
        className='past-drawn-block'
        body={
          <div className='table'>
            <div className='main-table'>
              {pastDrawnItems.length === 0 ? (
                <h4>No previous item</h4>
              ) : (
                <div>
                  {pastDrawnItems.map((item, index) =>
                    item ? (
                      <div className='row-table' key={index}>
                        <div className='row-table-name'>
                          <span>Name:</span>{" "}
                          <span>{item.data[1] && item.data[1]}</span>
                        </div>
                        <div className='row-table-id'>
                          <span>Coupon ID:</span>
                          <span>{item.data[0] && item.data[0]}</span>
                        </div>
                        <hr />
                      </div>
                    ) : (
                      ""
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        }
      />
    </div>
  )
}

export default PreviouslyDrawnItemsBlock
