export default (state = null, action) => {

  const { title, company, location, appliedDate, stage, id } = action;

  switch (action.type) {
    case "SELECT_APPLICATION":
      return {
        title: title,
        company: company,
        location: location,
        appliedDate: appliedDate,
        stage: stage,
        id: id
      };
    case "DESELECT_APPLICATION":
      return null;
    default:
      return state;
  }
};