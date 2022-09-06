const chartDataOrganizer = (data) => {
  let chartData = {
    type: `${data.chartType}`,
    data: {
      labels: data.labels,
      datasets: [
        {
          label: `${data.chartTitle}`,
          data: data.values,
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
