import React, { useState } from "react";

const Label = (
  {
    containerClass,
    title,
    temperatureHeadline,
    iconClass,
    icon,
    weatherIcon,
    feelsLike,
    sunrise,
    sunset,
    nameDay,
    index,
    min,
    max,
    eve,
    night,
    morn,
    day,
    uvi,
    wind_deg,
    wind_speed,
    detailButton
  },
  props
) => {
  const [show, setShow] = useState(false);
  const degreeSymbol = "C\u00b0";

  return (
    <div
      onClick={() => {
        const curState = !show;
        setShow(curState);
      }}
      style={{ cursor: detailButton === "N" ? "" : "pointer" }}
    >
      {detailButton === "N" ? "" : <div className="clickMe">Details</div>}
      <div
        className="weather top"
        index={index}
        style={{
          backgroundImage: `url('https://openweathermap.org/img/wn/${weatherIcon}@2x.png')`
        }}
      >
        <p className="day">{nameDay}</p>
        <div className="temp">
          <span className="value">{temperatureHeadline}</span>
          {degreeSymbol}
        </div>

        <div className="partTwo">
          <div>
            Feels Like: {feelsLike} {degreeSymbol}
          </div>
          <div>Sunrise: {sunrise}</div>
          <div>Sunset: {sunset}</div>
        </div>
      </div>
      {uvi && (
        <div className={show ? "extendedLabel" : "doNotShow"}>
          <div className="temperatureRange">
            <div>
              {min} {degreeSymbol}
              <div>Minimum</div>
            </div>
            <div>
              {morn} {degreeSymbol}
              <div>Morning</div>
            </div>
            <div>
              {day} {degreeSymbol}
              <div>Day</div>
            </div>
            <div>
              {eve} {degreeSymbol}
              <div>Evening</div>
            </div>
            <div>
              {night} {degreeSymbol}
              <div>Night</div>
            </div>
          </div>
          <div className="weatherOther">
            <div className="uvi">
              {uvi}
              <div>UVI</div>
            </div>
            <div className="wind_deg">
              {wind_deg} {"\u00b0"}
              <div>Wind Deg</div>
            </div>
            <div className="wind_speed">
              {wind_speed}
              <div>Wind Speed</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Label;
