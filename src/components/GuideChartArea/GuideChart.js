import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {
  getStartingDate,
  getPlantOutDate,
  createXAxis,
  createMonthLabels,
  createGradients
} from './HelperFunctions';

const BarChart = ({ selectedPlantsData, frostDate }) => { 

  // d3 directly manipulates the actual DOM (not the virtual DOM that react manages)
  // useRef allows us to directly reference a specific DOM element that D3 can apply changes to
  const ref = useRef();

  useEffect(() => {

    // ref.current gives d3 access to the actual div DOM node rendered by react
    // clears the previous d3 chart (so we aren't seeing a new additional chart every time we re-render)
    d3.select(ref.current).selectAll('*').remove();
    
    const width = window.innerWidth - 100; const height = 350; const padding = 10;
    const svg = d3.select(ref.current)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    const xScale = d3.scaleTime()
      .domain([new Date(2000, 0, 1), new Date(2000, 9, 1)])
      .range([0, width]);

    svg.selectAll("g")
      .data(selectedPlantsData)
      .enter()
      .append("g")
      .each(function(d, i) { // for each selected plant
        const fullBar = d3.select(this);
  
        const startDate = getStartingDate(frostDate, d.numWeeksIn);
        const endDate = new Date(startDate).setDate(startDate.getDate() + d.totalGrowth * 7);     
        const plantTransplantDate = getPlantOutDate(frostDate, d.weeksRelOut)
        
        const startPoint = xScale(startDate);
        const endPoint = xScale(endDate);
        const plantTransplantPoint = xScale(plantTransplantDate);
    
        // left hand part of bar, before plantOutDate
        fullBar.append("rect")
          .attr("x", startPoint)
          .attr("y", i * 50)
          .attr("width", plantTransplantPoint - startPoint) // go to change plant or transplant point
          .attr("height", 40)
          .attr("fill", "url(#orange-gradient)");
        // right hand part of bar after plantOutDate
        fullBar.append("rect")
          .attr("x", plantTransplantPoint) // begin new color at change point
          .attr("y", i * 50)
          .attr("width", endPoint - plantTransplantPoint) // continue till end of harvest date
          .attr("height", 40)
          .attr("fill", "url(#green-gradient)");       
      });

      createGradients(svg);
      createXAxis(svg, xScale, height, padding);
      createMonthLabels(svg, xScale, height);
        
    }, [selectedPlantsData, frostDate]
  )
  return <div ref={ref}></div>; // react assigns this div to ref.current
};

export default BarChart;