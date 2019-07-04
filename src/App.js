import React, { useState } from 'react';

import HomePage from './pages/HomePage/index'
import './App.scss'

function App() {
  const [isPageShow, setPageShow] = useState(true)
  return (
    <div className="App">
      <header>
        <p className="title">OrderList</p>
        <button className="add primary" onClick={() => {setPageShow(false)}}>Add New Order</button> 
      </header>
      <HomePage isPageShow={isPageShow} setPageShow={setPageShow} />
    </div>
  );
}

export default App;
