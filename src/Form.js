import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ setLocat, dummyData }) => {
  // const Form = (props, {setLocation}) => {
  // const dummyData = false
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [citiesFiltered, setCitiesFiltered] = useState([]);
  const [searchStatus, setSearchStatus] = useState(
    "enter at least three characters"
  );

  const getCitiesp1 = () =>
    axios(
      "https://raw.githubusercontent.com/davidreact/Cities/master/current.city.list.min.json"
    );
  const getCitiesp2 = () =>
    axios(
      "https://raw.githubusercontent.com/davidreact/Cities/master/current.citypt2.list.min.json"
    );

  const demoData = () =>
    axios(
      "https://raw.githubusercontent.com/davidreact/Cities/master/small.json"
    );

  useEffect(() => {
    const fetch = async () => {
      const [acct, acct2] = await Promise.all([
        getCitiesp1(),
        getCitiesp2()
      ]).catch(error => console.log("axios error", error));
      const joinedResults = [...acct.data, ...acct2.data];
      // console.log("jsonbin", joinedResults)
      setResult(joinedResults);
      console.log("fetch is called");
    };

    const resetVals = () => {
      setValue("");
      setCitiesFiltered([]);
    };
    // dummyData ? "a" : fetch();

    if (dummyData) {
      resetVals();
    } else {
      fetch();
    }

    // dummyData ? resetVals() : "a";
    // value.length >= 3 ? fetch() : ""
  }, [dummyData]);

  const filterResults = val => {
    if (val.length > 2) {
      const r1 = result
        .filter(city => city.name.toUpperCase().startsWith(val.toUpperCase()))
        .sort();
      // console.log("r1", r1);
      setCitiesFiltered(r1);
      if (!r1[0]) {
        setSearchStatus("Ouch! we don't know that location. No results");
      } else {
        setSearchStatus("");
      }
    } else {
      setCitiesFiltered([]);
      setSearchStatus("enter at least 3 characters");
    }
    setValue(val);
  };

  const handlerLocationClick = ele => {
    const loc =
      "lat=" + ele.getAttribute("lat") + "&lon=" + ele.getAttribute("lon");
    const name = ele.getAttribute("name");
    setCitiesFiltered([]);
    setValue(name);
    setLocat({ coordinates: loc, name: name });
  };

  return (
    <div className="inputBox">
      {/* {console.log("dummyData", dummyData)} */}
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
        id="form_weather"
      >
        <input
          className="searchBox"
          type="text"
          form="form_weather"
          value={value}
          onChange={e => {
            filterResults(e.target.value);
          }}
          disabled={dummyData}
        />
      </form>
      <div className="searchResults">
        {value.length > 0 ? searchStatus : ""}
        {citiesFiltered.map((ele, index) => {
          const {
            coord: { lat, lon },
            country,
            name
            // stat: { population }
          } = ele;

          return (
            <div
              className="results"
              key={index}
              lat={lat}
              lon={lon}
              name={name}
              country={country}
              onClick={e => handlerLocationClick(e.target)}
            >
              {name}, {country}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Form;
