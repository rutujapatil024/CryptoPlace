import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([['Date', 'Prices']]);

  useEffect(() => {
    let dataCopy = [['Date', 'Prices']];
    if (historicalData?.prices) {
      historicalData.prices.forEach(item => {
        const date = new Date(item[0]);
        const price = item[1];
        if (!isNaN(date) && typeof price === 'number') {
          dataCopy.push([date, price]);
        }
      });
    }
    setData(dataCopy);
  }, [historicalData]);

  const options = {
    title: 'Price Trend (Last 10 Days)',
    curveType: 'function',
    legend: { position: 'bottom' },
    backgroundColor: '#f5f5f5',
    chartArea: { width: '80%', height: '70%' },
  };

  return (
    <div style={{ width: '100%', maxWidth: '1000px', height: '400px' }}>
      <Chart
        chartType="LineChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
        legendToggle
      />
    </div>
  );
};

export default LineChart;
