import React, { useState } from "react";
import { useEffect } from "react";
// import * as d3 from "d3";
import { useLocation } from "react-router-dom";
import "./components.css";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {LinearScale} from 'chart.js';
// import { Line } from "react-chartjs-2";


Chart.register(LinearScale);


function Calculate() {
  const location = useLocation();
  const bfdata = location?.state?.Breakfastlist;
  const lhdata = location?.state?.Lunchlist;
  const drdata = location?.state?.Dinnerlist;
  const totaldata = bfdata.concat(lhdata,drdata)
  console.log(totaldata)

  const [protien,setprotien] = useState(0)
  const [fat,setfat] = useState(0)
  const [carbs,setcarbs] = useState(0)
 
  function calculateTotalMacros(data) {
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;
  
    data.reduce((acc, curr) => {
      totalProtein += curr.protein * parseInt(curr.quantity);
      totalFat += curr.fat * parseInt(curr.quantity);
      totalCarbs += curr.carbs * parseInt(curr.quantity);
      return acc
    }, 0);
  
    return {
      protein: totalProtein,
      fat: totalFat,
      carbs: totalCarbs,
    };
  }
  
  const totalmacros = calculateTotalMacros(totaldata)
  console.log(totalmacros)
  useEffect(()=>{
    setprotien(totalmacros.protein)
    setfat(totalmacros.fat)
    setcarbs(totalmacros.carbs)
  },[totalmacros])


  const data = {
    labels: ["Protein", "Fat", "Carbs"],
    datasets: [
      {
        label: "Macro-nutrients",
        data: [protien, fat, carbs],
        fill: true,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 3,
      },
      {
        label: "required values",
        data: [60, 100, 250], // fixed values for Protein, Fat and Carbs
        fill: true,
        backgroundColor: [
          "rgba(255, 0, 0, 0.5)",
          "rgba(255, 0, 0, 0.5)",
          "rgba(255, 0, 0, 0.5)",
        ],
        borderColor: [
          "rgba(255, 0, 0, 1)",
          "rgba(255, 0, 0, 1)",
          "rgba(255, 0, 0, 1)",
        ],
        borderWidth: 3,
      },
    ],
  };
  
  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  


  return (
    <div>
      <div>
        <h1>breakfast</h1>
        <div>
          {bfdata.map((item, index) => (
            <div
              style={{ display: "flex", justifyContent: "space-around" }}
              key={index}
            >
              <h3>{item.name}</h3>
              <p>Protein: {item.protein*item.quantity}</p>
              <p>Carbs: {item.carbs*item.quantity}</p>
              <p>Fat: {item.fat*item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>lunch</h1>
        <div>
          {lhdata.map((item, index) => (
            <div
              style={{ display: "flex", justifyContent: "space-around" }}
              key={index}
            >
              <h3>{item.name}</h3>
              <p>Protein: {item.protein*item.quantity}</p>
              <p>Carbs: {item.carbs*item.quantity}</p>
              <p>Fat: {item.fat*item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>dinner</h1>
        <div>
          {drdata.map((item, index) => (
            <div
              style={{ display: "flex", justifyContent: "space-around" }}
              key={index}
            >
              <h3>{item.name}</h3>
              <p>Protein: {item.protein*item.quantity}</p>
              <p>Carbs: {item.carbs*item.quantity}</p>
              <p>Fat: {item.fat*item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h1>total</h1>
        <p>protien:{protien}</p>
        <p>carbs:{carbs}</p>
        <p>fat:{fat}</p>
        
      </div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Calculate;