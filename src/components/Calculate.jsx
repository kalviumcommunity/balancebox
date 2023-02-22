import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

useEffect(() => {
    let proteinSum = 0;
    let fatSum=0;
    let carbsSum=0;
    for(let i=0;i<totaldata.length;i++)
    {
        proteinSum += totaldata[i].protein;
        fatSum+=totaldata[i].fat;
        carbsSum+=totaldata[i].carbs;
    }
    setprotien(proteinSum);
    setfat(fatSum);
    setcarbs(carbsSum);
  }, [totaldata]);
  

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
              <p>Protein: {item.protein}</p>
              <p>Carbs: {item.carbs}</p>
              <p>Fat: {item.fat}</p>
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
              <p>Protein: {item.protein}</p>
              <p>Carbs: {item.carbs}</p>
              <p>Fat: {item.fat}</p>
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
              <p>Protein: {item.protein}</p>
              <p>Carbs: {item.carbs}</p>
              <p>Fat: {item.fat}</p>
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
    </div>
  );
}

export default Calculate;