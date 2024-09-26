import React from 'react'
import TableHeader from './TableHeader'
import PlantList from '../PlantList'
import './GuideChart.css'

const GuideChart = () => {
  return (
    <div className="guidechart-wrapper">
      <TableHeader />
      <PlantList />
      <div className="guidechart-chart-wrapper">GuideChart</div>
    </div>

  )
}

export default GuideChart