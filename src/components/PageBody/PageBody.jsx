import React, {useState} from 'react'
import {Login, Register, GuideChart} from "../../components"
import './PageBody.css'

const PageBody = ({currentPage, frostDate, setFrostDate}) => {
  
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
        setFrostDate={setFrostDate}
      />;
  }
}

export default PageBody