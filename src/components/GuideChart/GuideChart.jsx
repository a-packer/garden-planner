import React, {useState, useEffect} from 'react';
import TableHeader from './TableHeader';
import PlantList from '../PlantList';
import BarChart from './BarChart';
import {getPlantData} from './HelperFunctions';
import './GuideChart.css';

const GuideChart = ({selectedPlants, setSelectedPlants, frostDate}) => {

  const [selectedPlantData, setSelectedPlantData] = useState([])

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

  return (
    <div className="guidechart-wrapper">
      <PlantList selectedPlants={selectedPlants} setSelectedPlants={setSelectedPlants} />
      <div className="guidechart-chart-wrapper">
        <TableHeader />
        <div className="svg-wrapper">
          <BarChart data={selectedPlantData} frostDate={frostDate} />
        </div>    
      </div>
    </div>
  )
}

export default GuideChart