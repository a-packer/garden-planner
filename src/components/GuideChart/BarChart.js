import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, frostDate }) => { 

  const ref = useRef();

  useEffect(() => {

    d3.select(ref.current).selectAll('*').remove();
    
    const width = 600; const height = 200; const padding = 10;

    const dataset = data

    const xScale = d3.scaleTime()
      .domain([new Date(2000, 1, 1), new Date(2000, 8, 1)])
      .range([0, width]);

    function formatFrostDate(frostDate) {
      const [month, day] = frostDate.split('/')
      return new Date(2000, parseInt(month) - 1, parseInt(day))
    } 

    function getStartingDate(frostDate, weeksIn) {
      const frostDateFormatted = formatFrostDate(frostDate)
      const date = new Date(frostDateFormatted);
      date.setDate(date.getDate() - weeksIn * 7);  // Subtract the days in to get starting date
      return date;
    }

    function getPlantOutDate(frostDate, weeksRelOut) {
      const date = new Date(formatFrostDate(frostDate));
      return date.setDate(date.getDate() + weeksRelOut * 7);
    }

    const svg = d3.select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

      const defs = svg.append("defs");

    const gradient = defs.append("linearGradient")
      .attr("id", "blue-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#08b3e5");

    gradient.append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "#1d80af");

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#1c61b1");

    svg.selectAll("g")
      .data(dataset)
      .enter()
      .append("g")
      .each(function(d, i) {

        const group = d3.select(this);
  
        const startDate = getStartingDate(frostDate, d.numWeeksIn);
        const endDate = new Date(startDate).setDate(startDate.getDate() + d.totalGrowth * 7);     
        const changeDate = getPlantOutDate(frostDate, d.weeksRelOut)
        
        const startX = xScale(startDate);
        const endX = xScale(endDate);
        const changeX = xScale(changeDate);
    
        // left hand part of bar, before plantOutDate
        if (startX < changeX) {
          group.append("rect")
            .attr("x", startX)
            .attr("y", i * 20)
            .attr("width", Math.min(changeX - startX, endX - startX)) // go to change point
            .attr("height", 15)
            .attr("fill", "url(#blue-gradient)");
        }

        // right hand part of bar after plantOutDate
        if (endX > changeX) {
          group.append("rect")
            .attr("x", changeX) // begin new color at change point
            .attr("y", i * 20)
            .attr("width", endX - changeX) // continue till end date
            .attr("height", 15)
            .attr("fill", "green");
        }
      });

      svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${height-padding - 10})`)
        .call(d3.axisBottom(xScale)
          .tickSize(0)
          .ticks(d3.timeMonth.every(1))
          .tickSizeInner(-height)
          .tickFormat(""));

      svg.selectAll(".month-label")
        .data(d3.timeMonths(new Date(2000, 0, 1), new Date(2001, 0, 1)))
        .enter()
        .append("text")
        .text(d => d3.timeFormat("%b")(d))
        .attr("class", "month-label")
        .attr("x", (d, i) => xScale(d) + (xScale(new Date(2000, i + 1, 1)) - xScale(d)) / 2) 
        .attr("y", height - 5)
        .attr("text-anchor", "middle");     
    }, [data, frostDate]
  ) // end of the use Effect
  return <div ref={ref}></div>;
};

export default BarChart;