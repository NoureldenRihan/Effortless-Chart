export const createChart = (data) => {
  return {
    type: "CREATE_CHART",
    payload: {
      data: data,
    },
  };
};

export const deleteChart = () => {
  return {
    type: "DELETE_CHART",
  };
};
