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

  const addInfo = (info) => {
    const {name, order, notes} = info
    if (name && order) { 
      formData.push({name, order, notes, disabled: false})
      setFormData([...formData])
      setPageShow(1)
    }
  }

  const updateInfo = (info) => {
    const {name, order, notes} = info
    if (name && order) {
      formData[currentIndex].name = name
      formData[currentIndex].order = order
      formData[currentIndex].notes = notes
      setFormData([...formData])
      setPageShow(1)
    }
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
      <button className={isPageShow !== 1 ? 'add primary addInfo' : (formData.length !== 0 ? 'add primary' : 'add primary')} onClick={() => {
        setPageShow(2)
      }}>New Order</button> 
    </header>
    {
      isPageShow === 1 ? 
      <section className="container">
        {
          formData.length !== 0 ? 
          <header>
            <span className="name">Name</span>
            <span className="price">Price</span>
            <span className="notes">Notes</span>
            <span className="action">Action</span>
          </header> : null
        }
        {
          formData.map((item, index) => (
            <div className="item" key={index} >
              <p className="name">{item.name}</p>
              <p className="price">{item.order}</p>
              <p className="notes">{item.notes}</p>
              <div className="action handle">
                <p className="edit" onClick={(event) => {handleEdit(event, index)}}>Edit</p>
                <p className="delete" onClick={(event) => {handleRemove(event, index)}}>Delete</p>
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
          addInfo={addInfo}
          updateInfo={updateInfo}
        />
    }
    </section>
  )
}


export default HomePage
