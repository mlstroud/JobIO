export default (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_SEARCH":
      return !state;
    case "NO_SEARCH":
      return false;
    default:
      return state;
  }
};