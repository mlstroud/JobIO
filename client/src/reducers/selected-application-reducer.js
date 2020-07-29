export default (state = null, action) => {

  const { application } = action;

  switch (action.type) {
    case "SELECT_APPLICATION":
      return {
        title: application.title,
        company: application.company,
        location: application.location,
        appliedDate: application.appliedDate,
        summary: application.summary,
        stage: application.stage,
        id: application.id
      };
    case "DESELECT_APPLICATION":
      return null;
    default:
      return state;
  }
};