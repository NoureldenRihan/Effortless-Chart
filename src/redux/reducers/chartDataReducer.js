const chartDataOrganizer = (data) => {
  let chartData = {
    colorState: data.colorState,
    type: `${data.chartType}`,
    data: {
      labels: data.labels,
      datasets: [
        {
          data: data.values,
          backgroundColor: data.backgroundColors,
          borderColor: data.borderColors,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          text: `${data.chartTitle}`,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: data.valuesTitle !== "" ? true : false,
            text: data.valuesTitle,
          },
        },
        x: {
          title: {
            display: data.labelsTitle !== "" ? true : false,
            text: data.labelsTitle,
          },
        },
      },
    },
  };
  return chartData;
};

const localStorageData = () => {
  if (localStorage.getItem("chartData") !== null) {
    let storedModel = JSON.parse(localStorage.getItem("chartData"));
    let dataModel = {
      colorState: storedModel.colorState,
      chartTitle: storedModel.options.plugins.title.text,
      chartType: storedModel.type,
      labels: storedModel.data.labels,
      values: storedModel.data.datasets[0].data,
      labelsTitle: storedModel.options.scales.x.title.text,
      valuesTitle: storedModel.options.scales.y.title.text,
      backgroundColors: storedModel.data.datasets[0].backgroundColor,
      borderColors: storedModel.data.datasets[0].borderColor,
    };
    return chartDataOrganizer(dataModel);
  }
  return {};
};

const chartDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_CHART":
      let newState = chartDataOrganizer(action.payload.data);
      localStorage.setItem("chartData", JSON.stringify(newState));
      return newState;
    case "DELETE_CHART":
      return {};
    default:
      let storedState = localStorageData();
      return storedState;
  }
};

export default chartDataReducer;
