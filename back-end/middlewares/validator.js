const tv4 = require('tv4');

module.exports.validator = (part, schema) => {
  return (req, res, next) => {
    const payload = req[part];
    const result = tv4.validateResult(payload, schema);
    if (!result.valid){
      const error = {
        status: 400,
        message: `${result?.error?.dataPath}${result?.error?.message}`
      };
      return next(error);
    }
    next();
  }
};