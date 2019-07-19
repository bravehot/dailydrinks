import React, { useState } from 'react'

import Header from '../../components/Header/index'
import {initialData, screenList} from '../../fixture/index'
import AddInfo from '../../components/AddInfo'
import './HomePage.scss'


const HomePage = () => {
  const [currentScreen, setCurrentScreen] = useState(screenList.LIST)
  const [currentIndex, setIndex] = useState(null)
  const [formData, setFormData] = useState([])
  const [currentData, setCurrentData] = useState({...initialData})

  const handleRemove = (index) => {
    if (formData.length) {
      let result  = window.confirm("Do you want to delete this order message ?");
      if (result === true) {
        formData.splice(index, 1)
        setFormData([...formData])
      } 
    }
  }

  const handleEdit = (index) => {
    setCurrentScreen(screenList.EDIT)
    setIndex(index)
    setCurrentData({...formData[index]})
  }

  const addInfo = (info) => {
    const {name, order, notes} = info
    if (name && order) { 
      formData.push({name, order, notes, disabled: false})
      setFormData([...formData])
      setCurrentScreen(screenList.LIST)
    }
  }

  const updateInfo = (info) => {
    const {name, order, notes} = info
    if (name && order) {
      const newFormData = {name, order, notes}
      formData[currentIndex] = {...newFormData}
      setFormData([...formData])
      setCurrentScreen(screenList.LIST)
    }
  }

  return (
    <section className="homePage">
    <Header 
      currentScreen={currentScreen} 
      setCurrentScreen={setCurrentScreen}
      formData={formData}
    />
    {
      currentScreen === screenList.LIST ? 
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
                <p className="edit" onClick={() => {handleEdit(index)}}>Edit</p>
                <p className="delete" onClick={() => {handleRemove(index)}}>Delete</p>
              </div>
          </div>
          ))
        }
      </section>
      : <AddInfo 
          setFormData={setFormData} 
          formData={formData} 
          setCurrentScreen={setCurrentScreen} 
          currentScreen={currentScreen} 
          currentData={currentData}
          currentIndex={currentIndex}
          addInfo={addInfo}
          updateInfo={updateInfo}
          screenList={screenList}
        />
    }
    </section>
  )
}


export default HomePage
