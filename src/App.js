import React, { useState } from 'react';

import HomePage from './containers/HomePage/index'
import './App.scss'

function App() {
  const [isPageShow, setPageShow] = useState(1)
  return (
    <div className="App">
      <header>
        {
          isPageShow === 1 ? <p className="title">OrderList</p> 
            : ( isPageShow === 2 ? <p className="title">Add Order</p> : <p className="title">Update Order</p>)
        }
        <button className="add primary" onClick={() => {setPageShow(2)}}>New Order</button> 
      </header>
      <HomePage isPageShow={isPageShow} setPageShow={setPageShow} />
    </div>
  );
}

export default App;
