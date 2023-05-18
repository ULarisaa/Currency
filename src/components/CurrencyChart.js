import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const CurrencyChart = ({ currencyCode }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchChartData();
  }, [currencyCode]);

  const fetchChartData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate sample data for the last 30 days
      const currentDate = new Date();
      const currencyData = [['Date', 'Value']];

      for (let i = 29; i >= 0; i--) {
        const date = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
        const value = Math.random() * 10; // Random value
        currencyData.push([date, value]);
      }

      setChartData(currencyData);
    } catch (error) {
      console.error('Error fetching currency data:', error);
    }
  };

  return (
    <div>
      
      <h2>The evolution of {currencyCode} in the last 30 days</h2>
      <Chart
        width={'100%'}
        height={'300px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          chartArea: { width: '80%', height: '70%' },
          legend: 'none',
          hAxis: {
            title: 'Date',
            format: 'MMM d',
            titleTextStyle: { color: '#333' },
            textStyle: { color: '#333' },
          },
          vAxis: {
            title: 'Value',
            minValue: 0,
            titleTextStyle: { color: '#333' },
            textStyle: { color: '#333' },
            gridlines: { color: '#ccc' },
          },
          colors: ['#1c449c'], 
          lineWidth: 2, 
          pointSize: 4, 
        }}
      />
    </div>
  );
};

export default CurrencyChart;
