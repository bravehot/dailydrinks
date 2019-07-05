import React, { useState } from 'react'
import PropTypes from 'prop-types'

import AddInfo from '../AddInfo'
import './HomePage.scss'

const HomePage = ({ isPageShow, setPageShow }) => {
  const inputDOM = React.createRef();
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

  const handleDisabled = (index, type) => {
    let currentInput =  Array.from(inputDOM.current.childNodes).splice(1, inputDOM.current.childNodes.length)[index].querySelectorAll('input')
    Array.from(currentInput).forEach(item => {
        type === 1 ? item.removeAttribute('disabled') : item.setAttribute('disabled', "")
    })
  }
  
  const handleEdit = (event, index) => {
    setPageShow(3)
    setIndex(index)
    setCurrentData({...formData[index]})
  }

  const updateInfo = (event, index) => {
    formData[index].disabled = false
    if (formData[index].name && formData[index].order){
      setFormData([...formData])
      handleDisabled(index, 2)
    } else {
      alert('请输入 OrderName 和 Price')
      formData[index].disabled = true
    }
  }

  const checkField = (index) => {
    if (!formData[index].name || !formData[index].order) {
      alert('Content not updated, whether to leave')
    }
  }


  return (
    <section className="homePage">
    {
      isPageShow === 1? 
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
                  }}
                  onBlur={() => {checkField(index)}}
                />
              </div>
              <div>
                <input type='number' value={item.order} disabled 
                  onChange={(event) => {
                    formData[currentIndex].order = event.target.value
                    setFormData([...formData])
                  }}
                  onBlur={() => {checkField(index)}}
                />
              </div>
              <div>
                <input type='text' value={item.notes} disabled 
                  onChange={(event) => {
                    formData[currentIndex].notes = event.target.value
                    setFormData([...formData])}} 
                  onBlur={() => {checkField(index)}}
                />
              </div>
              <div className="buttonBox">
              {
                item.disabled ? 
                  <button onClick={(event) => {updateInfo(event, index)}} className="default">Update</button> 
                  : <button onClick={(event) => {handleEdit(event, index)}} className="default">Edit</button>
              }
                <button onClick={(event) => {handleRemove(event, index)}} className="delete danger">Delete</button>
              </div>
          </div>
          ))
        }
        {
          formData.length === 0 ? <p className="toast">Sorry! This category have no data.</p> : null
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

HomePage.propTypes = {
  isPageShow: PropTypes.number,
  setPageShow: PropTypes.func
}

export default HomePage
