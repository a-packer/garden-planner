import React, {useState, useEffect} from 'react'
import TableHeader from './TableHeader'
import PlantList from '../PlantList'
import BarChart from './BarChart'
import './GuideChart.css'

const GuideChart = ({selectedPlants, setSelectedPlants, frostDate, setFrostDate}) => {

  const [selectedPlantData, setSelectedPlantData] = useState([])

  // Important to remember: State Triggers Re-renders: By setting plantData in the state, React knows when the data has changed and can re-render the component automatically. Without it, React won’t re-render the component after the data has been fetched.
  // State Handles Asynchronous Data: When you fetch data asynchronously, you don’t have immediate access to the data. State provides a way to keep track of the fetched data and ensures React is aware of updates.

  const getPlantData = async (species) => {
    try {
      const response = await fetch(`/plants/${species}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
      });
      if (response.ok) {
        const data = await response.json();
        return data; // return the resolved data
      }
    } catch (error) {
      console.log('Error with fetching plant data');
    }
  };

  useEffect(()=> {
    const fetchData = async () => {
      const dataPromises = selectedPlants.map((plantSpecies) => 
      getPlantData(plantSpecies)
    );
    const resolvedData = await Promise.all(dataPromises);
    setSelectedPlantData(resolvedData);
    }
    fetchData();
  }, [selectedPlants])

  console.log('frostDate', frostDate)

  return (
    <div className="guidechart-wrapper">
      <PlantList selectedPlants={selectedPlants} setSelectedPlants={setSelectedPlants} />
      <div className="guidechart-chart-wrapper">
        {selectedPlants.map((selectedPlant) => <li>{selectedPlant}</li>)}
        <TableHeader />
        <h1>TODO: frost date: pass down as props. state set in page header</h1>
        <BarChart data={selectedPlantData} />
      </div>
    </div>
  )
}

export default GuideChart