const errorHandler = (err, req, res, next) => {
  console.log({ err });
  if (err) {
    res.status(500);
    res.send({ isError: true, error: err });
    next();
  }
};

const urlHandler = (req, res, next) => {
  res.status(404);
  res.send({ isError: true, error: "Invalid URL" });
  next();
};

module.exports = { errorHandler, urlHandler };
