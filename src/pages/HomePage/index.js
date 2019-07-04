import React, { useState } from 'react'
import PropTypes from 'prop-types'


import AddInfo from '../AddInfo'

import './HomePage.scss'

const HomePage = ({ isPageShow, setPageShow }) => {
  const [currentIndex, setIndex] = useState(null)
  const inputDOM = React.createRef();
  const [formData, setFormData] = useState([])
  
  const handleRemove = (event, index) => {
    if (formData.length) {
      formData.splice(index, 1)
      setFormData([...formData])
    }
  }

  const handleDisabled = (index, type) => {
    let currentInput =  inputDOM.current.childNodes[index].querySelectorAll('input')
    Array.from(currentInput).forEach(item => {
        type === 1 ? item.removeAttribute('disabled') : item.setAttribute('disabled', "")
    })
  }
  
  const handleEdit = (event, index) => {
    formData[index].disabled = true
    setIndex(index)
    setFormData([...formData])
    handleDisabled(index, 1)
  }

  return (
    <section className="homePage">
    {
      isPageShow ? 
      <section className="container" ref={inputDOM}>
        {
          formData.map((item, index) => (
            <div className="item" key={index} >
              <div>
                <label htmlFor="name"> Name: </label>
                <input type='text' id="name" value={item.name} disabled 
                onChange={(event) => {
                  formData[currentIndex].name = event.target.value
                  setFormData([...formData])
                }}></input>
              </div>
              <div>
                <label htmlFor="order">order: </label>
                <input type='number' id="order" value={item.order} disabled 
                onChange={(event) => {
                  formData[currentIndex].order = event.target.value
                  setFormData([...formData])
                }}></input>
              </div>
              <div>
                <label htmlFor="notes">notes: </label>
                <input type='text' id="notes" value={item.notes} disabled 
                onChange={(event) => {
                  formData[currentIndex].notes = event.target.value
                  setFormData([...formData])
                }}></input>
              </div>
              <div>
                {
                  item.disabled ? 
                    <button onClick={() => {
                      formData[index].disabled = false
                      setFormData([...formData])
                      handleDisabled(index, 2)
                    }}>Update</button> 
                    : <button onClick={(event) => {handleEdit(event, index)}}>Edit</button>
                }
                <button onClick={(event) => {handleRemove(event, index)}} className="delete">Delete</button>
              </div>
          </div>
          ))
        }
        {
          formData.length === 0 ? <p className="toast">Sorry! This category have nothing data.</p> : null
        }
      </section>
       : <AddInfo setFormData={setFormData} formData={formData} setPageShow={setPageShow}/>
    }
    </section>
  )
}

HomePage.propTypes = {
  isPageShow: PropTypes.bool,
  setPageShow: PropTypes.func
}



export default HomePage
