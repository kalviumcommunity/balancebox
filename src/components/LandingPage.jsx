import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./components.css";
import logo from "./utils/logo.png";
import user from "./utils/Profile.png";



function LandingPage() {
  const navigate = useNavigate()
  const data = [
    { name: "alooparatha", protein: 5, carbs: 10, fat: 0 },
    { name: "bread", protein: 8, carbs: 60, fat: 8 },
    { name: "tea", protein: 6, carbs: 16, fat: 7 },
    { name: "apple", protein: 4, carbs: 106, fat: 57 },
  ];


  // hooks
  const [breakfast, setbreakfast] = useState("none");
  const [lunch, setlunch] = useState("none");
  const [dinner, setdinner] = useState("none");
  const [searched, setsearched] = useState("");
  const [Breakfastlist, setBreakfastList] = useState([]);
  const [Lunchlist, setLunchList] = useState([]);
  const [Dinnerlist, setDinnerList] = useState([]);

  

  useEffect(() => {
    console.log(Breakfastlist);
    console.log(Lunchlist);
    console.log(Dinnerlist);
  }, [Breakfastlist, Lunchlist, Dinnerlist]);

  // to display modal
  const changeBreakfast = () => {
    setbreakfast("block");
  };
  const changeLunch = () => {
    setlunch("block");
  };
  const changeDinner = () => {
    setdinner("block");
  };
  // for removing modal
  const removemodal = (event) => {
    if (event.currentTarget === event.target) {
      setbreakfast("none");
      setdinner("none");
      setlunch("none");
    }
  };

  // add input
  const changeHandler = (e) => {
    setsearched(e.target.value);
  };

  //  search
  const searchBreakfast = (search) => {
    search = searched.toLowerCase().trim();
    if (searched !== "") {
      const serachedData = data.filter((e) => {
        return e.name === search;
      })[0];
      //  console.log(serachedData)
      setBreakfastList([...Breakfastlist, serachedData]);
      setsearched("");
    }
  };

  const searchLunch = (search) => {
    search = searched.toLowerCase().trim();
    if (searched !== "") {
      const serachedData = data.filter((e) => {
        return e.name === search;
      })[0];
      // console.log(serachedData)
      setLunchList([...Lunchlist, serachedData]);
      setsearched("");
    }
  };

  const searchDinner = (search) => {
    search = searched.toLowerCase().trim();
    if (searched !== "") {
      const serachedData = data.filter((e) => {
        return e.name === search;
      })[0];
      // console.log(serachedData)
      setDinnerList([...Dinnerlist, serachedData]);
      setsearched("");
    }
  };



  const deletebfElement =(e)=>{
  // console.log(e)
  const index = e.target.parentNode.getAttribute("key");
  const updatedList = [...Breakfastlist];
  updatedList.splice(Breakfastlist.length-index-1, 1);
  setBreakfastList(updatedList);
  }

  const deletelhElement =(e)=>{
    // console.log(e)
    const index = e.target.parentNode.getAttribute("key");
    const updatedList = [...Lunchlist];
    updatedList.splice(Lunchlist.length-index-1, 1);
    setLunchList(updatedList);
    }

    const deletedrElement =(e)=>{
      // console.log(e)
      const index = e.target.parentNode.getAttribute("key");
      const updatedList = [...Dinnerlist];
      updatedList.splice(Dinnerlist.length-index-1, 1);
      setDinnerList(updatedList);
      }

  return (
    <div>
      <div className="navbar">
        <img src={logo} className="logo" alt="logo" />
        <div className="user-login">
          <p className="login">LOGIN</p>
          <img src={user} alt="" className="user" />
        </div>
      </div>
      <div className="content">
        <div className="left-text">
          <p>
            Feel the <span>power</span>
          </p>
          <p>of healthy</p>
          <span>choices.</span>
        </div>
        <div className="right-text">
          <div className="additems">
            <p>breakfast</p>
            <button onClick={() => changeBreakfast()}>+</button>
          </div>
          <div className="additems">
            <p>lunch</p>
            <button onClick={() => changeLunch()}>+</button>
          </div>
          <div className="additems">
            <p>dinner</p>
            <button onClick={() => changeDinner()}>+</button>
          </div>
        </div>
        <div
          className="Breakfast"
          onClick={(e) => removemodal(e)}
          style={{ display: `${breakfast}` }}
        >
          <div className="Breakfast-inner">
            <input
              type="searchbar"
              className="searchbar"
              placeholder="search"
              value={searched}
              onChange={changeHandler}
            />
            <button onClick={() => searchBreakfast()}>Add</button>
            <div>
              {Breakfastlist.map((item, index) => (
                <div key={index}>
                  <h3>{item.name}</h3>
                  <button onClick={(e)=>deletebfElement(e)} >delete</button>
                  {/* <p>Protein: {item.protein}</p>
                                  <p>Carbs: {item.carbs}</p>
                                  <p>Fat: {item.fat}</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="Lunch"
          onClick={(e) => removemodal(e)}
          style={{ display: `${lunch}` }}
        >
          <div className="Lunch-inner">
            <input
              type="searchbar"
              className="searchbar"
              value={searched}
              placeholder="search"
              onChange={changeHandler}
            />
            <button onClick={() => searchLunch()}>Add</button>
            <div>
              {Lunchlist.map((item, index) => (
                <div key={index}>
                  <h3>{item.name}</h3>
                  <button onClick={(e)=>deletelhElement(e)} >delete</button>
                  {/* <p>Protein: {item.protein}</p>
                                  <p>Carbs: {item.carbs}</p>
                                  <p>Fat: {item.fat}</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="Dinner"
          onClick={(e) => removemodal(e)}
          style={{ display: `${dinner}` }}
        >
          <div className="Dinner-inner">
            <input
              type="searchbar"
              className="searchbar"
              value={searched}
              placeholder="search"
              onChange={changeHandler}
            />
            <button onClick={() => searchDinner()}>Add</button>
            <div>
              {Dinnerlist.map((item, index) => (
                <div key={index}>
                  <h3>{item.name}</h3>
                  <button onClick={(e)=>deletedrElement(e)}>delete</button>
                  {/* <p>Protein: {item.protein}</p>
                                  <p>Carbs: {item.carbs}</p>
                                  <p>Fat: {item.fat}</p> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={()=>{
          navigate("/Calculate", {
            state: {
              Breakfastlist: Breakfastlist,
              Lunchlist:Lunchlist,
              Dinnerlist:Dinnerlist
            }
          })
        }}>calculate</button>
      </div>
    </div>
  );
}

export default LandingPage;