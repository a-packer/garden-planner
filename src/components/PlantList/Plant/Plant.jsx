import React from 'react'
import './Plant.css'

export const Plant = ({plant}) => {
  return (
    <div className="plant-wrapper">
      <label>{plant.species}</label>
      <input type="checkbox" key={plant.species}/>
    </div>
  )
    
}

export default Plant;
