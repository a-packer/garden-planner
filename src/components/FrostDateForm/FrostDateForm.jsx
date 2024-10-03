import React, { useState } from 'react'
import './FrostDateForm.css'

const FrostDateForm = () => {
  const [frostDate, setfrostDate] = useState('05/01');
  const handleChange = (event) => {
    setfrostDate(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('lastFrostDate:', frostDate );
  };
  return (
    <form onSubmit={handleSubmit} className="frostDateForm">
      <div>
      <label className='pageHeaderLabel'>Last Frost Date:</label>
        <input
          id='lastFrostDate'
          value={frostDate}
          onChange={handleChange}
          className='pageHeaderDateInput'
        />
      </div>
      <button type='submit' className='pageHeaderFrostDateButton'>Submit</button>
    </form>
  )
}

export default FrostDateForm