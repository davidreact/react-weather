import React from "react";
import Zingchart from "zingchart-react";

const Chart = ({ data }) => {
  console.log("data", data);
  const xSeries = data.map(y => y.y);
  const ySeries = data.map(hour => hour.x);
  const feelsLike = data.map(fl => fl.feelsLike);

  const config = {
    theme: "dark",
    graphset: [
      {
        type: "area",
        legend: {},
        plot: {
          animation: {
            delay: 500,
            effect: "ANIMATION_SLIDE_LEFT"
          }
        },
        title: {
          text: "Forecast next 48 hours",
          margin: "5px",
          fontFamily: "Arial",
          paddingTop: "20px",
          fontSize: "15px"
          // fontColor: "#fff"
        },
        tooltip: {
          text: `%kl %v C \u00b0`,
          visible: false
        },
        scaleX: {
          text: "temp",
          values: ySeries,
          guide: {
            lineStyle: "dashdot"
            // visible: true
          },
          fontColor: "white"
        },
        // crosshairX: {
        //   lineColor: "white",
        //   lineWidth: "1px",
        //   label: {
        //     text: "thisis is one"
        //   },
        //   plotLabel: {
        //     padding: "5px 10px",
        //     alpha: 1,
        //     borderRadius: "5px",
        //     fontColor: "#000",
        //     fontFamily: "Arial",
        //     fontSize: "10px",
        //     shadow: false
        //   }
        // },
        crosshairX: {
          lineColor: "black",
          label: {
            text: "this is the one"
          }
        },
        series: [
          {
            text: "Temp",
            values: xSeries
          },
          {
            text: "feels like",
            values: feelsLike
          }
        ]
      }
    ]
  };

  return <Zingchart data={config} height={300} />;
};

export default Chart;
