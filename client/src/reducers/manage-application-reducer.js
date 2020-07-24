export default (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_MANAGE":
      return !state;
    default:
      return state;
  }
};