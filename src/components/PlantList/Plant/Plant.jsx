import React from 'react'
import './Plant.css'

export const Plant = ({plant, selectedPlants, setSelectedPlants}) => {
  const updateSelectedPlants = (e) => {
    const plantName = e.target.name
    const isChecked = e.target.checked

    if (isChecked) {
      setSelectedPlants([...selectedPlants, plantName])
    }
    else {
      setSelectedPlants((selectedPlants) => 
        selectedPlants.filter((selectedPlant) => selectedPlant !== plantName)
      )
    }  
  }
  return (
    <div className="plant-wrapper">
      <label>{plant.species}</label>
       <input
        type="checkbox"
        key={plant.species}
        name={plant.species} 
        onChange={updateSelectedPlants}
      />
    </div>
  )
    
}

export default Plant;
