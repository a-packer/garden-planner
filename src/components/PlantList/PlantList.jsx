import React, {useState} from 'react';
import Plant from './Plant';
import './PlantList.css';

const PlantList = ({selectedPlants, setSelectedPlants}) => {
  const [listOfPlants, setListOfPlants] = useState([])
  const [plantsDisplayed, setPlantDisplayed] = useState(false)

  const displayPlants = async (e) => {
    e.preventDefault();
    console.log("Fetching plants...");
    try {
      const response = await fetch('/plants', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Data:", data); 
        setListOfPlants(data);
      } else {
        console.error("Server returned non-OK status:", response.status);
      }
    } catch (error) {
      console.log('Error with fetching plants', error);
    }

    setPlantDisplayed(true);
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

     <form className={plantsDisplayed ? "plantList-form" : "plantList-form-hidden"}>
      {listOfPlants.map((plant) => <Plant plant={plant} selectedPlants={selectedPlants} setSelectedPlants={setSelectedPlants}/>)}   
     </form>
      
    </div>

  )
}

export default PlantList