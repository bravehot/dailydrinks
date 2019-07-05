import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import './AddInfo.scss'

const AddInfo = ({
  setFormData, 
  formData, 
  setPageShow, 
  currentData, 
  isPageShow, 
  currentIndex
}) => {
  const errorName = React.createRef()
  const errorOrder = React.createRef()
  const [info, setInfo] = useState({
    name: '',
    order: '',
    notes: ''
  })

  const handleAddInfo = () => {
    const {name, order, notes} = info
    fieldCheck()
    if (name && order) { 
      formData.push({name, order, notes, disabled: false})
      setFormData([...formData])
      setInfo({
        name: '',
        order: '',
        notes: ''
      })
      setPageShow(1)
    }
  }

  const handleBack = () => {
    const {name, order, notes} = info
    if (name || order || notes) {
      let result  = window.confirm("Contents not saved. Whether to leave or not ?");
      if (result === true) {
        setPageShow(1)
      } 
    } else {
      setPageShow(1)
    }
  }

  const handleUpdate = () => {
    const {name, order, notes} = info
    fieldCheck()
    if (name && order) {
      formData[currentIndex].name = name
      formData[currentIndex].order = order
      formData[currentIndex].notes = notes
      setFormData([...formData])
      setPageShow(1)
    }
  }

  const fieldCheck = () => {
    const { name, order } = info
    name.length > 0 ? 
      errorName.current.className = 'error hide' 
      : errorName.current.className = 'error show'
    order.length > 0? 
      errorOrder.current.className = 'error hide' 
      : errorOrder.current.className = 'error show'
  }

  useEffect(() => {
    if (isPageShow === 3) {
      setInfo({...currentData})
    } else {
      setInfo({
        name: '',
        order: '',
        notes: ''
      })
    }
  }, [currentData, isPageShow])

  return (
    <div className="AddInfo">
      <div>
        <label htmlFor="name"> OrderName: </label>
        <div>
          <input type='text' id="name" value={info.name} onChange={(event) => {
            errorName.current.className = 'error hide' 
            setInfo({name: event.target.value, notes:info.notes, order: info.order})
          }}></input>
          <p className='error hide' ref={errorName}>OrderName is required</p>
        </div>
      </div>
      <div>
        <label htmlFor="order">Price: </label>
        <div>
          <input type='number' id="order" value={info.order} onChange={(event) => {
            errorOrder.current.className = 'error hide' 
            setInfo({order: event.target.value, notes:info.notes, name: info.name})
          } }></input>
          <p className='error hide' ref={errorOrder}>Price is required</p>
        </div>
      </div>
      <div>
        <label htmlFor="notes">Notes: </label>
        <div>
          <textarea type='text' id="notes" value={info.notes} onChange={(event) => setInfo({notes: event.target.value, name: info.name, order: info.order}) }></textarea>
        </div>
      </div>
      <div className="buttonBox">
        <button className="default back" onClick={() => {handleBack()}}>Back</button>
        {
          isPageShow !== 3 ? <button className="primary" onClick={() => {handleAddInfo()}}>Submit</button> 
          : <button className="primary" onClick={() => {handleUpdate()}}>Update</button>
        }
      </div>
    </div>
  )
}
AddInfo.propTypes = {
  setFormData: PropTypes.func.isRequired,
  formData: PropTypes.array.isRequired,
  setPageShow: PropTypes.func.isRequired,
  currentData: PropTypes.object.isRequired,
  isPageShow: PropTypes.number.isRequired,
  currentIndex: PropTypes.number
}

export default AddInfo