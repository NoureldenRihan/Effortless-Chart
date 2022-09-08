import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ChartGraph() {
  const chartData = useSelector((state) => state.chartDataReducer);

  const chartSetup = () => {
    const ctx = document.getElementById("chartCanvas").getContext("2d");
    new Chart(ctx, {
      type: chartData.type,
      data: {
        labels: chartData.data.labels,
        datasets: [
          {
            label: "",
            data: chartData.data.datasets[0].data,
            backgroundColor: chartData.data.datasets[0].backgroundColor,
            borderColor: chartData.data.datasets[0].borderColor,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: chartData.options.plugins.title.text,
            font: {
              family: "Arial",
              size: 30,
              weight: "700",
            },
            color: "#000000",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: chartData.options.scales.y.title.display,
              text: chartData.options.scales.y.title.text,
              font: {
                family: "Arial",
                size: 19,
                weight: "700",
              },
              color: "#000000",
            },
            ticks: {
              font: {
                family: "Arial",
                size: 12,
                weight: "600",
              },
              color: "#00000099",
            },
          },
          x: {
            title: {
              display: chartData.options.scales.x.title.display,
              text: chartData.options.scales.x.title.text,
              font: {
                family: "Arial",
                size: 19,
                weight: "600",
              },
              color: "#000000",
            },
            ticks: {
              font: {
                family: "Arial",
                size: 13,
                weight: "900",
              },
              color: "#00000099",
            },
          },
        },
      },
    });
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
    setInterval(() => {
      let bodyClasses = document.getElementsByTagName("body")[0].classList;
      if (window.location.pathname === "/chart") {
        bodyClasses.add("responsive");
      } else {
        bodyClasses.remove("responsive");
      }
    }, 300);
  }, []);

  return (
    <>
      <div className="chart">
        <canvas id="chartCanvas"></canvas>
      </div>
      <div className="buttons">
        <button
          onClick={() => document.getElementById("createChartPage").click()}
        >
          Create Another Chart
        </button>
        <button id="download">Download Image</button>
      </div>
      <Link id="createChartPage" to="/"></Link>
    </>
  );
}

export default ChartGraph;
