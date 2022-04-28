const logger = (store) => (next) => (action) => {
  //console.info("store...", store);
  next(action);
};

export default logger;
