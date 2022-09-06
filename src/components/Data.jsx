import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { createChart } from "../redux/actions/actions";

function Data() {
  const [dataCounter, setdataCounter] = useState([]);
  const dispatch = useDispatch();

  let dataset = (
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
      <button className="columnset"></button>
      <button className="columnset"></button>
    </div>
  );

  const sendData = (e) => {
    e.preventDefault();
    let labels = [];
    let values = [];

    document
      .querySelectorAll(".datasetLabel")
      .forEach((label) => labels.push(label.value));

    document
      .querySelectorAll(".datasetValue")
      .forEach((value) => values.push(parseInt(value.value)));

    let chartData = {
      chartTitle: document.getElementById("chartTitle").value,
      chartType: document.getElementById("chartType").value,
      labels: labels,
      values: values,
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
          {dataCounter.map((item) => {
            return dataset;
          })}
        </div>
        <button>Create Chart</button>
      </form>
      <Link id="chartPage" to="/chart"></Link>
    </div>
  );
}

export default Data;
