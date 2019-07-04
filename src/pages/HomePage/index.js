import React, { useState } from 'react'
import PropTypes from 'prop-types'

import AddInfo from '../AddInfo'
import './HomePage.scss'

const HomePage = ({ isPageShow, setPageShow }) => {
  const inputDOM = React.createRef();
  const [currentIndex, setIndex] = useState(null)
  const [formData, setFormData] = useState([])
  
  const handleRemove = (event, index) => {
    if (formData.length) {
      let result  = window.confirm("确定要删除此订单信息吗？");
      if (result === true) {
        formData.splice(index, 1)
        setFormData([...formData])
      } 
    }
  }

  const handleDisabled = (index, type) => {
    let currentInput =  Array.from(inputDOM.current.childNodes).splice(1, inputDOM.current.childNodes.length)[index].querySelectorAll('input')
    console.log(currentInput)
    
    Array.from(currentInput).forEach(item => {
        type === 1 ? item.removeAttribute('disabled') : item.setAttribute('disabled', "")
    })
  }
  
  const handleEdit = (event, index) => {
    setIndex(index)
    setFormData([...formData])
    setPageShow(false)
  }

  return (
    <section className="homePage">
    {
      isPageShow ? 
      <section className="container" ref={inputDOM}>
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
                }}></input>
              </div>
              <div>
                <input type='number' value={item.order} disabled 
                onChange={(event) => {
                  formData[currentIndex].order = event.target.value
                  setFormData([...formData])
                }}></input>
              </div>
              <div>
                <input type='text' value={item.notes} disabled 
                onChange={(event) => {
                  formData[currentIndex].notes = event.target.value
                  setFormData([...formData])
                }}></input>
              </div>
              <div className="buttonBox">
                <button onClick={(event) => {handleEdit(event, index)}} className="default">Edit</button>
                <button onClick={(event) => {handleRemove(event, index)}} className="delete danger">Delete</button>
              </div>
          </div>
          ))
        }
        {
          formData.length === 0 ? <p className="toast">Sorry! This category have nothing data.</p> : null
        }
      </section>
       : <AddInfo setFormData={setFormData} formData={formData} setPageShow={setPageShow} currentIndex={currentIndex} />
    }
    </section>
  )
}

HomePage.propTypes = {
  isPageShow: PropTypes.bool,
  setPageShow: PropTypes.func
}

export default HomePage
