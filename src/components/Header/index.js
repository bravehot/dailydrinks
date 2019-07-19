import React from 'react'
import PropTypes from 'prop-types';

import { screenList } from '../../fixture/index'
import './Header.scss'

const Header = ({currentScreen, setCurrentScreen, formData}) => {
  return (
    <header className={currentScreen !== screenList.LIST ? 'addInfo' : (formData.length !== 0 ? 'addInfo' : '')}>
      {
        currentScreen === screenList.LIST ? <p className="title">OrderList</p> 
          : ( currentScreen === screenList.ADD ? <p className="title">Add Order</p> : <p className="title">Edit Order</p>)
      }
      {
        ( currentScreen === screenList.LIST ) ?  formData.length === 0 ? <p className="no-data">
          You don’t have any orders yet. <br/>
          Click the “New Order” button to add your own order.
        </p> : null : null
      }
      {
        currentScreen === screenList.LIST ? 
        <button className="add primary" onClick={() => {
          setCurrentScreen(screenList.ADD)
        }}>New Order</button> : null
      }
    </header>
  )
}

Header.prototype = {
  currentScreen: PropTypes.string.isRequired,
  setCurrentScreen: PropTypes.func.isRequired,
  formData: PropTypes.array.isRequired
}
export default Header
