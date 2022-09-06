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
            backgroundColor: [
              "rgba(255, 99, 132, 0.1)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Values in EGP",
            },
          },
          x: {
            title: {
              display: true,
              text: "Graders",
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
