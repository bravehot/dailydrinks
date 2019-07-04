import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './AddInfo.sass'

const AddInfo = ({setFormData, formData}) => {
  const [info, setInfo] = useState({
    name: '',
    order: '',
    notes: ''
  })

  const handleAddInfo = () => {
    const {name, order, notes} = info
    console.log(info);
    
    if (name && order) { 
      formData.push({name, order, notes, disabled: false})
      setFormData([...formData])
      setInfo({
        name: '',
        order: '',
        notes: ''
      })
      
    } else {
      alert('error')
    }
  }
  return (
    <div className="AddInfo">
      <div>
        <label htmlFor="name"> Name: </label>
        <input type='text' id="name" value={info.name} onChange={(event) => setInfo({name: event.target.value, notes:info.notes, order: info.order})}></input>
      </div>
      <div>
        <label htmlFor="order">order: </label>
        <input type='number' id="order" value={info.order} onChange={(event) => setInfo({order: event.target.value, notes:info.notes, name: info.name}) }></input>
      </div>
      <div>
        <label htmlFor="notes">notes: </label>
        <input type='text' id="notes" value={info.notes} onChange={(event) => setInfo({notes: event.target.value, name: info.name, order: info.order}) }></input>
      </div>
      <div>
        <button onClick={() => {handleAddInfo()}}>Submit</button>
      </div>
    </div>
  )
}
AddInfo.propTypes = {
  setFormData: PropTypes.func,
  formData: PropTypes.array
}

export default AddInfo