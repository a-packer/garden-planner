import React, {useState} from 'react'
import {Login, Register, GuideChart} from "../../components"
import './PageBody.css'

const PageBody = ({currentPage, frostDate}) => {
  
  const [selectedPlants, setSelectedPlants] = useState([])

  switch (currentPage) {
    case 'login':
      return <Login />;
    case 'register':
      return <Register />;
    default:
      return <GuideChart 
        selectedPlants={selectedPlants} 
        setSelectedPlants={setSelectedPlants}
        frostDate={frostDate}
      />;
  }
}

export default PageBody