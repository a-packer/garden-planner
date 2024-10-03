import React from 'react'
import FrostDateForm from './FrostDateForm';
import './PageHeader.css';

const PageHeader = ({setCurrentPage, frostDate, setFrostDate}) => {

  return (
    <div className='pageHeaderWrapper'>
      <button onClick={() => setCurrentPage('guideChart')} className="tableHeaderTitle">Planting Schedule</button>
      <button onClick={() => setCurrentPage('login')} className='pageHeaderNavButton'>Login</button>
      <button onClick={() => setCurrentPage('register')} className='pageHeaderNavButton'>Register</button>
      <FrostDateForm frostDate={frostDate} setFrostDate={setFrostDate}/>
    </div>
  )
}

export default PageHeader