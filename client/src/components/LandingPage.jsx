import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./components.css";
// import logo from "../../public/logo.png";
// import userimg from "";
// import { data } from "./data.js";
function LandingPage() {
  const navigate = useNavigate();
  // console.log(data);

  // hooks
  const [breakfast, setbreakfast] = useState("none");
  const [lunch, setlunch] = useState("none");
  const [dinner, setdinner] = useState("none");
  const [searched, setsearched] = useState("");
  const [Breakfastlist, setBreakfastList] = useState([]);
  const [Lunchlist, setLunchList] = useState([]);
  const [Dinnerlist, setDinnerList] = useState([]);
  const [data, setData] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  // const [blogdata,setBlogdata] = useState([])
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  // const { logout } = useAuth0();
  // const { , isLoading } = useAuth0();
  console.log(user);

  useEffect(() => {
    // console.log(Breakfastlist);
    // console.log(Lunchlist);
    // console.log(Dinnerlist);
    const getCourse = async () => {
      try {
        const res = await fetch("https://balancebox.onrender.com/get-food");
        // const res = await fetch('http://localhost:5000/get-food')
        const datad = await res.json();
        // console.log('res')
        setData(datad);

        if (data.status === 422 || data.status === 500) {
          alert(data.error);
          return data.error;
        }

        console.log("Data: ", data);
      } catch (err) {
        return "An erros occured: " + err;
      }
    };
    getCourse();

    // console.log(blogdata,data)
  }, [Breakfastlist, Lunchlist, Dinnerlist, data]);

  useEffect(() => {
    const saveUser = async () => {
      if (isAuthenticated) {
        const setuser = await fetch("http://localhost:5000/user-details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sub: user.sub,
            name: user.name,
            email: user.email,
          }),
        });
        console.log(setuser);
      }
    };
    saveUser();
  }, [isAuthenticated]);

  // login

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
    const value = e.target.value;
    console.log("Input value:", value);
    console.log("data:", data);
    // Filter suggestions based on input value
    const filtered = data.filter((suggestion) => {
      console.log(suggestion.name.toLowerCase().includes(value.toLowerCase()));
      return suggestion.name.toLowerCase().includes(value.toLowerCase());
    });
    console.log(filtered);
    setFilteredSuggestions(filtered);
    setsearched(value);
  };

  //  search
  const searchBreakfast = (search) => {
    search = searched;
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
    search = searched;
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
    search = searched;
    if (searched !== "") {
      const serachedData = data.filter((e) => {
        return e.name === search;
      })[0];
      // console.log(serachedData)
      setDinnerList([...Dinnerlist, serachedData]);
      setsearched("");
    }
  };

  const deletebfElement = (e) => {
    // console.log(e)
    const index = e.target.parentNode.getAttribute("key");
    const updatedList = [...Breakfastlist];
    updatedList.splice(Breakfastlist.length - index - 1, 1);
    setBreakfastList(updatedList);
  };

  const deletelhElement = (e) => {
    // console.log(e)
    const index = e.target.parentNode.getAttribute("key");
    const updatedList = [...Lunchlist];
    updatedList.splice(Lunchlist.length - index - 1, 1);
    setLunchList(updatedList);
  };

  const deletedrElement = (e) => {
    // console.log(e)
    const index = e.target.parentNode.getAttribute("key");
    const updatedList = [...Dinnerlist];
    updatedList.splice(Dinnerlist.length - index - 1, 1);
    setDinnerList(updatedList);
  };

  const updateQuantitybf = (index, value) => {
    const updatedList = [...Breakfastlist];
    updatedList[index].quantity = value;
    setBreakfastList(updatedList);
  };
  const updateQuantitylh = (index, value) => {
    const updatedList = [...Lunchlist];
    updatedList[index].quantity = value;
    setLunchList(updatedList);
  };
  const updateQuantitydr = (index, value) => {
    const updatedList = [...Dinnerlist];
    updatedList[index].quantity = value;
    setDinnerList(updatedList);
  };
  const selectItem = (e) => {
    // console.log(e);
    setsearched(e.target.outerText);
    changeHandler({
      target: {
        value: e.target.outerText,
      },
    });
  };
  const selectImage = (e) => {
    setsearched(e.target.alt);
    changeHandler({
      target: {
        value: e.target.alt,
      },
    });
  };
  const handleSuggestionClick = (suggestion) => {
    // Set input value to selected suggestion
    setsearched(suggestion.name);
    // Clear suggestions
    setFilteredSuggestions([]);
  };

  const handleCalculate = () => {
    const saveData = async () => {
      const data = await fetch("http://localhost:5000/put-user-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sub: user.sub,
          List: { Breakfastlist, Lunchlist, Dinnerlist },
        }),
      });
      console.log(data)
    };
    saveData()
    navigate("/Calculate", {
      state: {
        Breakfastlist: Breakfastlist,
        Lunchlist: Lunchlist,
        Dinnerlist: Dinnerlist,
      },
    });
  };

  return (
    <div>
      <div className="navbar">
        <img src={`./logo.png`} className="logo" alt="logo" />
        <div className="user-login">
          <div
            onClick={() => {
              navigate("/Blog");
            }}
          >
            <h1 className="login">Blog</h1>
          </div>

          {isAuthenticated ? (
            <p
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="login"
            >
              Logout
            </p>
          ) : (
            <p onClick={() => loginWithRedirect()} className="login">
              Login
            </p>
          )}
          {isAuthenticated ? (
            <img src={user.picture} alt="" className="user" />
          ) : (
            <img src={`./Profile.png`} alt="" className="user" />
          )}
        </div>
      </div>
      <div className="content">
        <div className="left-text">
          <p className="title">
            Feel the <span className="power">power</span>
            <br /> of healthy
            <span className="choices"> choices.</span>
          </p>
          <p className="sub-title">
            Balance Box helps you eat for the life you want and not for the life
            you have.
          </p>
        </div>
        <div></div>
        <div className="right-text">
          <div className="add-button">
            <p>Breakfast</p>
            <button onClick={() => changeBreakfast()}>+</button>
          </div>
          <div className="additems">
            <div className="List">
              {Breakfastlist.map((item, index) => (
                <div key={index}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{"(x"}</p>
                    <p>{item.quantity}</p>
                    <p>{")"}</p>
                    <button onClick={(e) => deletebfElement(e)}>
                      <img
                        className="bin"
                        src={`data:image/png;base64,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`}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="add-button">
            <p>Lunch</p>
            <button onClick={() => changeLunch()}>+</button>
          </div>
          <div className="additems">
            <div className="List">
              {Lunchlist.map((item, index) => (
                <div key={index}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>x</p>
                    <p>{item.quantity}</p>
                    <button onClick={(e) => deletelhElement(e)}>
                      <img
                        className="bin"
                        src={`data:image/png;base64,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`}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="add-button">
            <p>Dinner</p>
            <button onClick={() => changeDinner()}>+</button>
          </div>
          <div className="additems">
            <div className="List">
              {Dinnerlist.map((item, index) => (
                <div key={index}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>x</p>
                    <p>{item.quantity}</p>
                    <button onClick={(e) => deletedrElement(e)}>
                      <img
                        className="bin"
                        src={`data:image/png;base64,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`}
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="calculate" onClick={() => handleCalculate()}>
            Calculate
          </button>
        </div>
        <div
          className="Breakfast"
          onClick={(e) => removemodal(e)}
          style={{ display: `${breakfast}` }}
        >
          <div className="Breakfast-inner">
            <div className="searchbar">
              <input
                type="searchbar"
                placeholder="Search and Add"
                value={searched}
                onChange={changeHandler}
              />
              <button onClick={() => searchBreakfast()}>+</button>
            </div>
            {searched ? (
              <div className="suggestions">
                {filteredSuggestions.map((suggestion, index) => (
                  <p
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </p>
                ))}
              </div>
            ) : null}
            <div>
              <div className="foodList">
                {data.map((item) => (
                  <div>
                    <img
                      onClick={(e) => selectImage(e)}
                      src={item.image}
                      alt={item.name}
                      className="modal-image"
                    />
                    <p onClick={(e) => selectItem(e)}>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            {Breakfastlist.length > 0 && (
              <div className="innerList">
                {Breakfastlist.map((item, index) => (
                  <div key={index}>
                    <ul>
                      <li>{item.name}</li>
                      <p>quantity:</p>
                      <input
                        type="number"
                        defaultValue={1}
                        min={1}
                        onChange={(e) =>
                          updateQuantitybf(index, e.target.value)
                        }
                      />
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className="Lunch"
          onClick={(e) => removemodal(e)}
          style={{ display: `${lunch}` }}
        >
          <div className="Lunch-inner">
            <div className="searchbar">
              <input
                type="searchbar"
                value={searched}
                placeholder="Search and Add"
                onChange={(e) => changeHandler(e)}
              />
              <button onClick={() => searchLunch()}>+</button>
            </div>
            {searched ? (
              <div className="suggestions">
                {filteredSuggestions.map((suggestion, index) => (
                  <p
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </p>
                ))}
              </div>
            ) : null}

            <div className="foodList">
              {data.map((item) => (
                <div>
                  <img
                    onClick={(e) => selectImage(e)}
                    src={item.image}
                    alt={item.name}
                    className="modal-image"
                  />
                  <p onClick={(e) => selectItem(e)}>{item.name}</p>
                </div>
              ))}
            </div>
            {Lunchlist.length > 0 && (
              <div className="innerList">
                {Lunchlist.map((item, index) => (
                  <div key={index}>
                    <ul>
                      <li>{item.name}</li>
                      <p>quantity</p>
                      <input
                        type="number"
                        defaultValue={1}
                        min={1}
                        onChange={(e) =>
                          updateQuantitylh(index, e.target.value)
                        }
                      />
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          className="Dinner"
          onClick={(e) => removemodal(e)}
          style={{ display: `${dinner}` }}
        >
          <div className="Dinner-inner">
            <div className="searchbar">
              <input
                type="searchbar"
                value={searched}
                placeholder="Search and Add"
                onChange={changeHandler}
              />
              <button onClick={() => searchDinner()}>+</button>
            </div>
            {searched ? (
              <div className="suggestions">
                {filteredSuggestions.map((suggestion, index) => (
                  <p
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </p>
                ))}
              </div>
            ) : null}
            <div className="foodList">
              {data.map((item) => (
                <div>
                  <img
                    onClick={(e) => selectImage(e)}
                    src={item.image}
                    alt={item.name}
                    className="modal-image"
                  />
                  <p onClick={(e) => selectItem(e)}>{item.name}</p>
                </div>
              ))}
            </div>
            {Dinnerlist.length > 0 && (
              <div className="innerList">
                {Dinnerlist.map((item, index) => (
                  <div key={index}>
                    <ul>
                      {" "}
                      <li>{item.name}</li>
                      <p>quantity</p>
                      <input
                        type="number"
                        defaultValue={1}
                        min={1}
                        onChange={(e) =>
                          updateQuantitydr(index, e.target.value)
                        }
                      />
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
      </style>
    </div>
  );
}

export default LandingPage;
