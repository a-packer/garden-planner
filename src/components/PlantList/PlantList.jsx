import React, {useState} from 'react';
import Plant from './Plant';
import './PlantList.css';

const PlantList = ({selectedPlants, setSelectedPlants}) => {
  const [listOfPlants, setListOfPlants] = useState([])
  const [plantsDisplayed, setPlantDisplayed] = useState(false)

  const displayPlants = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/plants', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        setListOfPlants(await response.json())
      }
    } catch (error) {
      console.log('Error with fetching plants');
    }
    setPlantDisplayed(true)
  };

  const hidePlants = () => {
    setPlantDisplayed(false)
  }


  return (
    <div className="plantList-wrapper">

     <button 
      onClick={plantsDisplayed ? hidePlants : displayPlants} 
      className="plant-list-button">
      {plantsDisplayed ? 'Hide Plant List' : 'Display Plant List'}
     </button>
     <button className="plant-list-button">Update Planner</button>

     <form className={plantsDisplayed ? "plantList-form" : "plantList-form-hidden"}>
      {listOfPlants.map((plant) => <Plant plant={plant} selectedPlants={selectedPlants} setSelectedPlants={setSelectedPlants}/>)}   
     </form>
      
    </div>

  )
}

export default PlantList