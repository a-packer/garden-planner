import React, { useState } from 'react'

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="lastFrostDate">Last Frost Date:</label>
        <input
          id="lastFrostDate"
          value={frostDate}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default FrostDateForm