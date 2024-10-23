import * as d3 from 'd3';

export const getPlantData = async (species) => {
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

const formatFrostDate = (frostDate) => {
  const [month, day] = frostDate.split('/')
  return new Date(2000, parseInt(month) - 1, parseInt(day))
};

export const getStartingDate = (frostDate, weeksIn) => {
  const frostDateFormatted = formatFrostDate(frostDate)
  const date = new Date(frostDateFormatted);
  date.setDate(date.getDate() - weeksIn * 7);  // Subtract the days inside (7 days in a week) to get starting date
  return date;
};

export const getPlantOutDate = (frostDate, weeksRelOut) => {
  const date = new Date(formatFrostDate(frostDate));
  return date.setDate(date.getDate() + weeksRelOut * 7);
};

export const createXAxis = (svg, xScale, height, padding) => {
  svg.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height-padding - 10})`)
    .call(d3.axisBottom(xScale)
      .tickSize(0)
      .ticks(d3.timeMonth.every(1))
      .tickSizeInner(-height)
      .tickFormat(""));
}

export const createMonthLabels = (svg, xScale, height) => {
  svg.selectAll(".month-label")
    .data(d3.timeMonths(new Date(2000, 0, 1), new Date(2001, 0, 1)))
    .enter()
    .append("text")
    .text(d => d3.timeFormat("%b")(d))
    .attr("class", "month-label")
    .attr("x", (d, i) => xScale(d) + (xScale(new Date(2000, i + 1, 1)) - xScale(d)) / 2) 
    .attr("y", height - 5)
    .attr("text-anchor", "middle"); 
}

export const createGradients = (svg) => {
  const defs = svg.append("defs");

  const gradientGreen = defs.append("linearGradient")
    .attr("id", "orange-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");
  gradientGreen.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#D76572");
  gradientGreen.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#FED44B");

  const gradientBlue = defs.append("linearGradient")
    .attr("id", "green-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");
  gradientBlue.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#FED44B");
  gradientBlue.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#13b586");
};
