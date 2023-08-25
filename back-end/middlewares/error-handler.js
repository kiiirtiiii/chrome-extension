const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log('error: ', JSON.stringify(err));
    res.status(err.status || 500);
    res.send({ isError: true, error: err.message });
  }
};

const urlHandler = (req, res, next) => {
  res.status(404);
  res.send({ isError: true, error: "Invalid URL" });
};

module.exports = { errorHandler, urlHandler };
