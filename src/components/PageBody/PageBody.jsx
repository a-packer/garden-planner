import React, {useState} from 'react'
import {Login, Register, GuideChartArea, PlantList} from "../../components"
import './PageBody.css'

const PageBody = ({currentPage, frostDate}) => {
  
  const [selectedPlants, setSelectedPlants] = useState([])

  switch (currentPage) {
    case 'login':
      return <Login />;
    case 'register':
      return <Register />;
    default:
      return <>
        <PlantList selectedPlants={selectedPlants} setSelectedPlants={setSelectedPlants} />
        <GuideChartArea 
          selectedPlants={selectedPlants} 
          setSelectedPlants={setSelectedPlants}
          frostDate={frostDate}
        />;
      </>
      
  }
}

export default PageBody