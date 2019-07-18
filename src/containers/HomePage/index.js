import React, { useState } from 'react'

import AddInfo from '../AddInfo'
import './HomePage.scss'

const HomePage = () => {
  /**
   * isPageShow: 1 --> OrderList
   * isPageShow: 2 --> Add Order
   * isPageShow: 3 --> Update Order
   */ 
  const [isPageShow, setPageShow] = useState(1)
  const [currentIndex, setIndex] = useState(null)
  const [formData, setFormData] = useState([])
  const [currentData, setCurrentData] = useState({
    name: '',
    order: '',
    notes: ''
  })
  
  const handleRemove = (event, index) => {
    if (formData.length) {
      let result  = window.confirm("Do you want to delete this order message ?");
      if (result === true) {
        formData.splice(index, 1)
        setFormData([...formData])
      } 
    }
  }

  const handleEdit = (event, index) => {
    setPageShow(3)
    setIndex(index)
    setCurrentData({...formData[index]})
  }

  return (
    <section className="homePage">
    <header className={isPageShow !== 1 ? 'addInfo' : (formData.length !== 0 ? 'addInfo' : '')}>
      {
        isPageShow === 1 ? <p className="title">OrderList</p> 
          : ( isPageShow === 2 ? <p className="title">Add Order</p> : <p className="title">Update Order</p>)
      }
      {
        ( isPageShow === 1 ) ?  formData.length === 0 ? <p className="no-data">
          You don’t have any orders yet. <br/>
          Click the “New Order” button to add your own order.
        </p> : null : null
      }
      <button className="add primary" onClick={() => {
        setPageShow(2)
      }}>New Order</button> 
    </header>
    {
      isPageShow === 1 ? 
      <section className="container">
        {
          formData.length !== 0 ? 
          <header>
            <span>OrderName</span>
            <span>Price</span>
            <span>Notes</span>
            <span>Action</span>
          </header> : null
        }
        {
          formData.map((item, index) => (
            <div className="item" key={index} >
              <div>
                <input type='text' value={item.name} disabled
                  onChange={(event) => {
                    formData[currentIndex].name = event.target.value
                    setFormData([...formData])
                  }}
                />
              </div>
              <div>
                <input type='number' value={item.order} disabled 
                  onChange={(event) => {
                    formData[currentIndex].order = event.target.value
                    setFormData([...formData])
                  }}
                />
              </div>
              <div>
                <input type='text' value={item.notes} disabled 
                  onChange={(event) => {
                    formData[currentIndex].notes = event.target.value
                    setFormData([...formData])}} 
                />
              </div>
              <div className="buttonBox">
                <button onClick={(event) => {handleEdit(event, index)}} className="default">Edit</button>
                <button onClick={(event) => {handleRemove(event, index)}} className="delete danger">Delete</button>
              </div>
          </div>
          ))
        }
      </section>
      : <AddInfo 
          setFormData={setFormData} 
          formData={formData} 
          setPageShow={setPageShow} 
          isPageShow={isPageShow} 
          currentData={currentData}
          currentIndex={currentIndex}
        />
    }
    </section>
  )
}


export default HomePage
