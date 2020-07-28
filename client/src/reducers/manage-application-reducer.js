export default (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_MANAGE":
      return !state;
    case "NO_MANAGE":
      return false;
    default:
      return state;
  }
};