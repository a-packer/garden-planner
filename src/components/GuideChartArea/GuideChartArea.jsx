import React, {useState, useEffect} from 'react';
import TableHeader from './TableHeader';
import GuideChart from './GuideChart';
import {getPlantData} from './HelperFunctions';
import './GuideChartArea.css';

const GuideChartArea = ({selectedPlants, frostDate}) => {

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
      
      <div className="guidechart-chart-wrapper">
        <TableHeader />
        <div className="svg-wrapper">
          <GuideChart data={selectedPlantData} frostDate={frostDate} />
        </div>    
      </div>
    </div>
  )
}

export default GuideChartArea;