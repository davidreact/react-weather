import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import data from "./data.json";
import List from "./List";
import Form from "./Form";

export default function App() {
  const [response, setResponse] = useState("");
  const [dummyData, setDummyData] = useState(true);
  const [location, setLocation] = useState({
    name: "TestLocation"
    // coordinates: "lat=60.99&lon=30.9"
  });
  const { daily, current, hourly, timezone } = dummyData ? data : response;
  const [errorFetch, setErrorFetch] = useState("");
  const degreeSymbol = "C&deg";

  const url = `https://api.openweathermap.org/data/2.5/onecall?${
    location.coordinates
  }&units=metric&appid=e66c15c7d993cdad58c03a9118e8f732`;

  // eslint-disable-next-line
  useEffect(() => {
    const fetch = async () => {
      try {
        // eslint-disable-next-line
        const result = await axios(url);
        setResponse(result.data);
      } catch (error) {
        setErrorFetch(error);
        console.log("errorfetch", errorFetch);
      }
    };
    fetch();
  }, [location.coordinates]);

  return (
    <div className="app">
      <h1 className="title">The Weather App</h1>
      <div className="inputBox">
        <div className="radioInput">
          <label className="switch">
            <input
              type="checkbox"
              checked={dummyData ? "" : "yes"}
              onClick={() => {
                const value = !dummyData;
                setDummyData(value);
              }}
            />
            <span className="slider round" />
          </label>
          <span className="dummyData">
            {dummyData ? "Click to enable search" : "Enter a city name below"}
          </span>
        </div>
        <Form setLocat={setLocation} dummyData={dummyData} />
      </div>

      {dummyData === false && response === "" ? (
        ""
      ) : (
        <List
          daily={daily}
          current={current}
          hourly={hourly}
          timezone={timezone}
          locationName={location.name}
          symbol={degreeSymbol}
        />
      )}
    </div>
  );
}
