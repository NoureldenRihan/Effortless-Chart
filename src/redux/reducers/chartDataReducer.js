const chartDataOrganizer = (data) => {
  let chartData = {
    type: `${data.chartType}`,
    data: {
      labels: data.labels,
      datasets: [
        {
          label: `${data.chartTitle}`,
          data: data.values,
          backgroundColor: data.backgroundColors,
          borderColor: data.borderColors,
          borderWidth: () => {
            if (data.borderWidth >= 5) {
              return 5;
            } else if (data.borderWidth <= 0) {
              return 1;
            } else {
              return data.borderWidth;
            }
          },
        },
      ],
    },
    options: {
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

const chartDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_CHART":
      let newState = chartDataOrganizer(action.payload.data);
      return newState;
    case "DELETE_CHART":
      return {};
    default:
      return state;
  }
};

export default chartDataReducer;
