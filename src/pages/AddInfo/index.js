import React, { useState } from 'react'
import PropTypes from 'prop-types';

import './AddInfo.scss'

const AddInfo = ({setFormData, formData, setPageShow}) => {
  const [info, setInfo] = useState({
    name: '',
    order: '',
    notes: ''
  })
  const handleAddInfo = () => {
    const {name, order, notes} = info
    if (name && order) { 
      formData.push({name, order, notes, disabled: false})
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
    } 
  }

  return (
    <div className="AddInfo">
      <div>
        <label htmlFor="name"> OrderName: </label>
        <input type='text' id="name" value={info.name} onChange={(event) => setInfo({name: event.target.value, notes:info.notes, order: info.order})}></input>
      </div>
      <div>
        <label htmlFor="order">price: </label>
        <input type='number' id="order" value={info.order} onChange={(event) => setInfo({order: event.target.value, notes:info.notes, name: info.name}) }></input>
      </div>
      <div>
        <label htmlFor="notes">notes: </label>
        <textarea type='text' id="notes" value={info.notes} onChange={(event) => setInfo({notes: event.target.value, name: info.name, order: info.order}) }></textarea>
      </div>
      <div className="buttonBox">
        <button className="default back" onClick={() => {handleBack()}}>Back</button>
        <button className="primary" onClick={() => {handleAddInfo()}}>Submit</button>
      </div>
    </div>
  )
}
AddInfo.propTypes = {
  setFormData: PropTypes.func,
  formData: PropTypes.array,
  setPageShow: PropTypes.func
}

export default AddInfo