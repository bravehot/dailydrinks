import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import './AddInfo.scss'

const AddInfo = ({setFormData, formData, setPageShow, currentIndex}) => {
  const [info, setInfo] = useState({
    name: '',
    order: '',
    notes: ''
  })

  const [oldIndex, setOldIndex] = useState(-1)
  
  const handleAddInfo = () => {
    const {name, order, notes} = info
    if (name && order) { 
      formData.push({name, order, notes})
      setFormData([...formData])
      setInfo({
        name: '',
        order: '',
        notes: ''
      })
      setPageShow(true)
    } else {
      if (!name) {
        window.confirm("请填写订单名称!");
      } else if (!order) {
        window.confirm("请填写订单数量!");
      }
    }
  }

  const handleBack = () => {
    const {name, order, notes} = info
    if (!name || !order || !notes) {
      let result  = window.confirm("内容未保存，确定要离开嘛？");
      if (result === true) {
        setPageShow(true)
      } 
    } else {
      setPageShow(true)
    }
  }

  const updateAddInfo = () => {
    formData[currentIndex] = {name: info.name, notes:info.notes, order: info.order}
    setFormData([...formData])
    setInfo({
      name: '',
      order: '',
      notes: ''
    })
    setPageShow(true)
  }


  return (
    <div className="AddInfo">
      <div>
        <label htmlFor="name"> OrderName: </label>
        <input type='text' id="name" value={info.name} onChange={(event) => setInfo({name: event.target.value, notes:info.notes, order: info.order})}></input>
      </div>
      <div>
        <label htmlFor="order">Price: </label>
        <input type='number' id="order" value={info.order} onChange={(event) => setInfo({order: event.target.value, notes:info.notes, name: info.name}) }></input>
      </div>
      <div>
        <label htmlFor="notes">Notes: </label>
        <textarea type='text' id="notes" value={info.notes} onChange={(event) => setInfo({notes: event.target.value, name: info.name, order: info.order}) }></textarea>
      </div>
      <div className="buttonBox">
        <button className="default back" onClick={() => {handleBack()}}>Back</button>
        {
          typeof currentIndex === 'number' ? <button className="primary" onClick={() => {updateAddInfo()}}>Update</button> : 
          <button className="primary" onClick={() => {handleAddInfo()}}>Submit</button>
        }
      </div>
    </div>
  )
}
AddInfo.propTypes = {
  setFormData: PropTypes.func,
  formData: PropTypes.array,
  setPageShow: PropTypes.func,
  currentIndex: PropTypes.number
}

export default AddInfo