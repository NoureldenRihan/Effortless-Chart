import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { createChart } from "../redux/actions/actions";
import Dataset from "./Dataset";

function Data() {
  const [dataCounter, setdataCounter] = useState(2);
  const [dataset, setdataset] = useState([]);
  const dispatch = useDispatch();

  const setColors = () => {
    let finalColorSet = [];
    let state = document.querySelector(
      "input[type=radio][name=colorState]:checked"
    ).value;
    if (state === "single") {
      let color = getRandomColor();
      for (let i = 0; i < dataCounter; i++) {
        finalColorSet.push(color);
      }
    } else if (state === "multiple") {
      for (let i = 0; i < dataCounter; i++) {
        finalColorSet.push(getRandomColor());
      }
    }
    return finalColorSet;
  };

  const getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const sendData = (e) => {
    e.preventDefault();
    let labels = [];
    let values = [];
    let chosenColors = setColors();
    let colors = [];
    let bordercolors = [];

    document
      .querySelectorAll(".datasetLabel")
      .forEach((label) => labels.push(label.value));

    document
      .querySelectorAll(".datasetValue")
      .forEach((value) => values.push(parseInt(value.value)));

    chosenColors.forEach((color) => {
      colors.push(color + "33");
      bordercolors.push(color + "ff");
    });

    let chartData = {
      chartTitle: document.getElementById("chartTitle").value,
      chartType: document.getElementById("chartType").value,
      labels: labels,
      values: values,
      labelsTitle: document.getElementById("labelsTitle").value,
      valuesTitle: document.getElementById("valuesTitle").value,
      backgroundColors: colors,
      borderColors: bordercolors,
    };

    dispatch(createChart(chartData));
    document.getElementById("chartPage").click();
  };

  const removeDataset = (e) => {
    e.preventDefault();
    setdataset(dataset.slice(0, -1));
    setdataCounter((old) => {
      if (old !== 0) {
        return old - 1;
      } else {
        return 1;
      }
    });
    return;
  };

  const addDataset = (e) => {
    e.preventDefault();
    setdataset(dataset.concat(<Dataset key={dataset.length} />));
    setdataCounter(dataCounter + 1);
    return;
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
          {dataset}
        </div>
        <hr className="breaker" />
        <div className="full">
          <h3>Colors: </h3>
          <div className="colorState">
            <label htmlFor="colorState">Single</label>
            <input
              id="labelsTitle"
              type="radio"
              name="colorState"
              value="single"
              required
            />
          </div>
          <div className="colorState">
            <label htmlFor="colorState">Multiple</label>
            <input
              id="labelsTitle"
              type="radio"
              name="colorState"
              value="multiple"
              required
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
