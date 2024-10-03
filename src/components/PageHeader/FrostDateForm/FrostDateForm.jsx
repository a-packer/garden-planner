import React from 'react'
import './FrostDateForm.css'

const FrostDateForm = ({frostDate, setFrostDate}) => {
  const handleChange = (event) => {
    setFrostDate(event.target.value);
  };

  return (
    <form className="frostDateForm">
      <div>
      <label className='pageHeaderLabel'>Last Frost Date:</label>
        <input
          id='lastFrostDate'
          value={frostDate}
          onChange={handleChange}
          className='pageHeaderDateInput'
        />
      </div>
    </form>
  )
}

export default FrostDateForm