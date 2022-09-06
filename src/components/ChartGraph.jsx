import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteChart } from "../redux/actions/actions";

function ChartGraph() {
  const chartData = useSelector((state) => state.chartDataReducer);
  const dispatch = useDispatch();

  const chartSetup = () => {
    const ctx = document.getElementById("chartCanvas").getContext("2d");
    const myChart = new Chart(ctx, {
      type: chartData.type,
      data: {
        labels: chartData.data.labels,
        datasets: [
          {
            label: chartData.data.datasets[0].label,
            data: chartData.data.datasets[0].data,
            backgroundColor: chartData.data.datasets[0].backgroundColor,
            borderColor: chartData.data.datasets[0].borderColor,
            borderWidth: chartData.data.datasets[0].borderWidth,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: chartData.options.scales.y.title.display,
              text: chartData.options.scales.y.title.text,
            },
          },
          x: {
            title: {
              display: chartData.options.scales.x.title.display,
              text: chartData.options.scales.x.title.text,
            },
          },
        },
      },
    });
  };

  const back = () => {
    dispatch(deleteChart(chartData));
    document.getElementById("createChartPage").click();
  };

  useEffect(() => {
    chartSetup();
    const canvas = document.getElementById("chartCanvas");
    document.getElementById("download").addEventListener("click", function (e) {
      const link = document.createElement("a");
      link.download = `${chartData.data.datasets[0].label}-${chartData.type}Chart.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  }, []);

  return (
    <>
      <div className="chart">
        <canvas id="chartCanvas"></canvas>
      </div>
      <div className="buttons">
        <button onClick={back}>Create Another Chart</button>
        <button id="download">Download Image</button>
      </div>
      <Link id="createChartPage" to="/"></Link>
    </>
  );
}

export default ChartGraph;
