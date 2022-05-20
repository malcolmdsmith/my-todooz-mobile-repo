const toast = (store) => (next) => (action) => {
  if (action.type === "api/callFailed") {
    switch (action.payload) {
      case "Unauthorized":
        alert("You are not logged in!!");
        break;
      default:
        alert(action.payload);
    }
  } else return next(action);
};

export default toast;
