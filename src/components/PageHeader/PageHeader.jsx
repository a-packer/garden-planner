import React from 'react'
import './PageHeader.css'

const PageHeader = ({setCurrentPage, currentPage}) => {

  return (
    <div className='pageHeaderWrapper'>
      <button onClick={() => setCurrentPage('login')} className='pageHeaderNavButton'>Login</button>
      <button onClick={() => setCurrentPage('register')} className='pageHeaderNavButton'>Register</button>
      <label className="pageHeaderLabel">Frost Date: </label>
      <input type="text" placeholder="mm/dd" className="pageHeaderDateInput"></input>
    </div>
  )
}

export default PageHeader