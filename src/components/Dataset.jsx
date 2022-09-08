import React from "react";

function Dataset() {
  return (
    <div className="dataset">
      <div className="half">
        <input
          id="datasetLabel"
          className="datasetInput datasetLabel"
          placeholder="Label"
          type="text"
          required
        />
      </div>
      <div className="half">
        <input
          id="datasetValue"
          className="datasetInput datasetValue"
          placeholder="Value in Numbers"
          type="text"
          required
        />
      </div>
    </div>
  );
}

export default Dataset;
