export default (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_SEARCH":
      return !state;
    default:
      return state;
  }
};