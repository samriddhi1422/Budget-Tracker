import React, { useEffect } from "react";
import './Chart.css'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);


function PieChart({ expensesByCategory }){
    const labels = Object.keys(expensesByCategory);
    const data = Object.values(expensesByCategory);

    
    const chartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Expenses",
          },
        },
      };

    return(
    <>
    <div className="chart-container">
     
      <Doughnut data={chartData} options={options} />
    </div>

    
    </>
    )
}
export default PieChart;