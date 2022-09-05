const tst = (state = 0, action) => {
  switch (action.type) {
    case "s":
      return state + 1;
    default:
      return state;
  }
};

export default tst;
