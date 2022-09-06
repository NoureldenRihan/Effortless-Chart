import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { createChart } from "../redux/actions/actions";
import DataColor from "./DataColor";
import Dataset from "./Dataset";

function Data() {
  const [dataCounter, setdataCounter] = useState([]);
  const [idCounter, setidCounter] = useState([]);
  const dispatch = useDispatch();

  const sendData = (e) => {
    e.preventDefault();
    let labels = [];
    let values = [];
    let colors = [];
    let bordercolors = [];

    document
      .querySelectorAll(".datasetLabel")
      .forEach((label) => labels.push(label.value));

    document
      .querySelectorAll(".datasetValue")
      .forEach((value) => values.push(parseInt(value.value)));

    document.querySelectorAll(".datasetBackgroundColors").forEach((color) => {
      colors.push(color.value + "33");
      bordercolors.push(color.value + "ff");
    });

    let chartData = {
      chartTitle: document.getElementById("chartTitle").value,
      chartType: document.getElementById("chartType").value,
      labels: labels,
      values: values,
      labelsTitle: document.getElementById("labelsTitle").value,
      valuesTitle: document.getElementById("valuesTitle").value,
      borderWidth: parseInt(document.getElementById("borderWidth").value),
      backgroundColors: colors,
      borderColors: bordercolors,
    };

    dispatch(createChart(chartData));
    document.getElementById("chartPage").click();
  };

  const removeDataset = (e) => {
    e.preventDefault();
    setdataCounter((old) => {
      old.pop();
      return [...old];
    });
  };

  const addDataset = (e) => {
    e.preventDefault();
    setdataCounter((old) => [...old, 1]);
    return;
  };

  const showAdditionalOptions = (e) => {
    document.getElementById("additionalOptions").style.display = "flex";
    e.target.remove();
  };

  return (
    <div className="dataContainer">
      <h1 className="title"> Create Your Chart </h1>
      <form className="form" onSubmit={sendData}>
        <div className="half">
          <h3>Chart Title: </h3>
          <input id="chartTitle" type="text" required />
        </div>
        <div className="half">
          <h3>Chart Type: </h3>
          <select id="chartType" name="chartType" required>
            <option value="">--Select a Type--</option>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="doughnut">Pie/Doughnut</option>
            <option value="radar">Radar</option>
            <option value="polarArea">PolarArea</option>
            <option value="scatter">Scatter</option>
            <option value="bubble">Bubble</option>
          </select>
        </div>
        <div className="half">
          <h3>Labels Title: </h3>
          <input id="labelsTitle" type="text" />
        </div>
        <div className="half">
          <h3>Values Title: </h3>
          <input id="valuesTitle" type="text" />
        </div>
        <hr className="breaker" />
        <h2>Data Sets</h2>
        <div id="datasets" className="datasets">
          <div className="dataset">
            <div className="half">
              <input
                id="chartTitle"
                className="datasetInput datasetLabel"
                placeholder="Label"
                type="text"
                required
              />
            </div>
            <div className="half">
              <input
                id="chartTitle"
                className="datasetInput datasetValue"
                placeholder="Value in Numbers"
                type="text"
                required
              />
            </div>
            <button className="removeDataset" onClick={removeDataset}>
              X
            </button>
            <button className="addDataset" onClick={addDataset}>
              +
            </button>
          </div>
          {dataCounter.map(() => {
            return <Dataset key={Math.random()} />;
          })}
        </div>
        <hr className="breaker" />
        <h4 className="addOptions" onClick={showAdditionalOptions}>
          Additional Options
        </h4>
        <div id="additionalOptions" className="additionalOptions">
          <h2>Additional Options</h2>
          <div className="full">
            <h3>Label Color: </h3>
            <input className="datasetBackgroundColors" type="color" />
          </div>
          {dataCounter.map(() => {
            return <DataColor key={Math.random()} />;
          })}
          <div className="full">
            <h3> Border width: </h3>
            <input
              id="borderWidth"
              placeholder="Width in Numbers"
              type="text"
            />
          </div>
        </div>
        <button>Create Chart</button>
      </form>
      <Link id="chartPage" to="/chart"></Link>
    </div>
  );
}

export default Data;
