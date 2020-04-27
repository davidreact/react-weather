import React from "react";
import Label from "./Label";
import moment from "moment";
import "moment-timezone";
import Chart from "./Chart";

const List = ({ daily, current, timezone, locationName, hourly }) => {
  const {
    dt,
    feels_like,
    sunrise,
    sunset,
    temp,
    weather
    // clouds,
    // dew_point,
    // humidity
  } = current;

  const timeFormat = (unixdate, format = "DD-MMM-YYYY hh:mm:ss A") =>
    moment
      .unix(unixdate)
      .tz(timezone)
      .format(format);

  const dataHourly2 = hourly.map((day, index) => ({
    x: timeFormat(day.dt, "D MMM ha"),
    y: day.temp,
    feelsLike: day.feels_like
  }));

  return (
    <div className="CurrentDetails fadeIn">
      <div className="topSection">
        <div>
          {" "}
          Timezone <div>{timezone}</div>{" "}
        </div>
        <div>
          {" "}
          Location <div> {locationName}</div>{" "}
        </div>
        <div>
          {" "}
          Current Date <div> {timeFormat(dt, "DD MMM YY")}</div>{" "}
        </div>
        <div>
          {" "}
          Current Time <div>{timeFormat(dt, "hh:mm:ss A")}</div>{" "}
        </div>
      </div>

      <div className="today">
        <Label
          containerClass="weather top"
          temperatureHeadline={temp}
          feelsLike={feels_like}
          sunset={timeFormat(sunset, "hh:mm:ss A")}
          sunrise={timeFormat(sunrise, "hh:mm:ss A")}
          weatherIcon={weather[0].icon}
          nameDay="Current"
          detailButton="N"
        />
      </div>

      <div className="hourlyChart">
        <Chart data={dataHourly2} />
      </div>
      <div className="forecast">
        {daily.map((ele, index) => {
          const {
            dt,
            feels_like,
            sunrise,
            sunset,
            temp,
            uvi,
            wind_deg,
            wind_speed,
            humidity,
            dew_point,
            clouds,
            weather
          } = ele;

          return (
            <>
              <Label
                key={index}
                index={index}
                containerClass="weather top"
                temperatureHeadline={temp.max}
                temperatureRange={temp}
                min={temp.min}
                max={temp.max}
                eve={temp.eve}
                morn={temp.morn}
                day={temp.day}
                uvi={uvi}
                wind_deg={wind_deg}
                wind_speed={wind_speed}
                night={temp.night}
                feelsLike={feels_like.day}
                sunset={timeFormat(sunset, "hh:mm:ss A")}
                sunrise={timeFormat(sunrise, "hh:mm:ss A")}
                weatherIcon={weather[0].icon}
                // day={timeFormat(dt, "DD MMM YY")}
                nameDay={moment
                  .unix(dt)
                  .tz(timezone)
                  .calendar(null, {
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    nextWeek: "dddd",
                    lastDay: "[Yesterday]",
                    lastWeek: "[Last] dddd",
                    sameElse: "DD MMM YY"
                  })}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default List;
