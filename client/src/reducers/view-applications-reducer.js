export default (state = false, action) => {
  switch (action.type) {
    case "VIEW_APPLICATIONS":
      return !state;
    default:
      return state;
  }
};