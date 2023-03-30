import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./components.css";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { LinearScale } from "chart.js";
import {
  Box,
  Card,
  FormLabel,
  VStack,
  FormControl,
  Input,
} from "@chakra-ui/react";

Chart.register(LinearScale);

function Calculate() {
  const location = useLocation();
  const bfdata = location?.state?.Breakfastlist;
  const lhdata = location?.state?.Lunchlist;
  const drdata = location?.state?.Dinnerlist;
  const totaldata = bfdata.concat(lhdata, drdata);
  const [Display, setDisplay] = useState("none");
  const [Age, setAge] = useState("");
  const [Weigth, setWeight] = useState("");
  const [dataOk, setDataok] = useState(false);
  // const [requiredCarbs, setRequiredCarbs] = useState('');
  // const [requiredFats, setRequiredFats] = useState('');

  // console.log(totaldata);

  const [protien, setprotien] = useState(0);
  const [fat, setfat] = useState(0);
  const [carbs, setcarbs] = useState(0);
  const [calories, setcalories] = useState(0);

  function calculateTotalMacros(data) {
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let totalCalories = 0;

    data.reduce((acc, curr) => {
      console.log(curr);
      totalProtein += curr.protien * parseInt(curr.quantity);
      totalFat += curr.fat * parseInt(curr.quantity);
      totalCarbs += curr.carbs * parseInt(curr.quantity);
      totalCalories += curr.calories * parseInt(curr.quantity);
      return acc;
    }, 0);

    return {
      protein: Math.round(parseFloat(totalProtein)),
      fat: Math.round(parseFloat(totalFat)),
      carbs: Math.round(parseFloat(totalCarbs)),
      calories: Math.round(parseFloat(totalCalories)),
    };
  }

  const totalmacros = calculateTotalMacros(totaldata);
  console.log(totalmacros);

  useEffect(() => {
    setprotien(totalmacros.protein);
    setfat(totalmacros.fat);
    setcarbs(totalmacros.carbs);
    setcalories(totalmacros.calories);
  }, [totalmacros]);

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
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 3,
      },
      {
        label: "required values",
        data: [parseInt(Weigth) * 1.5, 0.25 * calories, 9 * Weigth], // fixed values for Protein, Fat and Carbs
        fill: true,
        backgroundColor: [
          "rgba(255, 0, 0, 0.5)",
          "rgba(255, 0, 0, 0.5)",
          "rgba(255, 0, 0, 0.5)",
          "rgba(255, 0, 0, 0.5)",
        ],
        borderColor: [
          "rgba(255, 0, 0, 1)",
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
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div className="display-body">
        <div>
          <h1>Breakfast</h1>
          <div>
            {bfdata.map((item, index) => (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  marginLeft: "10vw",
                }}
                key={index}
              >
                <h3>{item.name}</h3>
                <p>Protein: {item.protien * item.quantity}</p>
                <p>Carbs: {item.carbs * item.quantity}</p>
                <p>Fat: {item.fat * item.quantity}</p>
                <p>Calories: {item.calories * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>Lunch</h1>
          <div>
            {lhdata.map((item, index) => (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  marginLeft: "10vw",
                }}
                key={index}
              >
                <h3>{item.name}</h3>
                <p>Protein: {item.protien * item.quantity}</p>
                <p>Carbs: {item.carbs * item.quantity}</p>
                <p>Fat: {item.fat * item.quantity}</p>
                <p>Calories: {item.calories * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>Dinner</h1>
          <div>
            {drdata.map((item, index) => (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  marginLeft: "10vw",
                }}
                key={index}
              >
                <h3>{item.name}</h3>
                <p>Protein: {item.protien * item.quantity}</p>
                <p>Carbs: {item.carbs * item.quantity}</p>
                <p>Fat: {item.fat * item.quantity}</p>
                <p>Calories: {item.calories * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            marginTop: "10px",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginRight: "18.0vw" }}>Total</h1>
          <p>Protien:{protien}</p>
          <p>Carbs:{carbs}</p>
          <p>Fat:{fat}</p>
          <p>Calories:{calories}</p>
        </div>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
        </style>
      </div>
      {Age && Weigth && dataOk ? (
        <div style={{width:"80vw",marginLeft:"10vw",border:'2px  solid black'}}>
          <Bar data={data} options={options} />
        </div>
      ) : (
        <div
          onMouseOver={() => {
            setDisplay("block");
          }}
          onMouseLeave={() => {
            setDisplay("none");
          }}
          style={{ position: "relative", width: "80vw", marginLeft: "10vw" }}
        >
          <div className="grayFilm"></div>
          <Bar data={data} options={options} />
          <Box className="InputForm" style={{ display: `${Display}` }}>
            <VStack>
              <Card
                bg="#f6f8fa"
                variant="outline"
                borderColor="#d8dee4"
                maxW="40vw"
                borderRadius="5px"
                padding="10px"
              >
                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <Input
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    type="text"
                    bg="white"
                    borderColor="#d8dee4"
                    size="md"
                    borderRadius="6px"
                    width="25vw"
                  ></Input>
                  <FormLabel>Weight</FormLabel>
                  <Input
                    onChange={(e) => {
                      setWeight(e.target.value);
                    }}
                    type="text"
                    bg="white"
                    borderColor="#d8dee4"
                    size="md"
                    borderRadius="6px"
                    width="25vw"
                  ></Input>
                </FormControl>
                <button
                  onClick={() => {
                    setDataok(true);
                  }}
                >
                  Submit
                </button>
              </Card>
            </VStack>
          </Box>
        </div>
      )}
    </div>
  );
}

export default Calculate;
