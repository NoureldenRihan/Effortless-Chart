import React from "react";

function Dataset() {
  return (
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
}

export default Dataset;