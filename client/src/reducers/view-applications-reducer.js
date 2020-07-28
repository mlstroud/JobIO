export default (state = false, action) => {
  switch (action.type) {
    case "VIEW_APPLICATIONS":
      return !state;
    case "NO_APPLICATIONS":
      return false;
    default:
      return state;
  }
};