import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import {initialData, screenList} from '../../fixture/index'
import './AddInfo.scss'

const AddInfo = ({
  setCurrentScreen, 
  currentData, 
  currentScreen, 
  addInfo,
  updateInfo,
}) => {
  const errorName = React.createRef()
  const errorOrder = React.createRef()
  const [info, setInfo] = useState({...initialData})

  const handleAddInfo = () => {
      fieldCheck()
      addInfo(info)
  }

  const handleBack = () => {
    const {name, order, notes} = info
    if (name || order || notes) {
      let result  = window.confirm("Contents not saved. Whether to leave or not ?");
      if (result === true) {
        setCurrentScreen(screenList.LIST)
      } 
    } else {
      setCurrentScreen(screenList.LIST)
    }
  }

  const handleUpdate = () => {
    fieldCheck()
    updateInfo(info)
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
    if (currentScreen === screenList.EDIT) {
      setInfo({...currentData})
    } else {
      setInfo({...initialData})
    }
  }, [currentData, currentScreen])

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
          currentScreen !== screenList.EDIT ? <button className="primary" onClick={() => {handleAddInfo()}}>Submit</button> 
          : <button className="primary" onClick={() => {handleUpdate()}}>Update</button>
        }
      </div>
    </div>
  )
}
AddInfo.propTypes = {
  setCurrentScreen: PropTypes.func.isRequired,
  currentData: PropTypes.object.isRequired,
  currentScreen: PropTypes.string.isRequired,
  addInfo: PropTypes.func.isRequired,
  updateInfo: PropTypes.func.isRequired,
}

export default AddInfo