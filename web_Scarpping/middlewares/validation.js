const Validator = require("fastest-validator");
const v = new Validator();

const registerSchema = {
  name: { type: "string", min: 3, max: 255, require: true },
  password: { type: "string", min: 5, max: 15, require: true },
};

const checkRegister = v.compile(registerSchema);

const updateSchema = {
  name: { type: "string", min: 3, max: 255 },
  password: { type: "string", min: 5, max: 15 },
};

const checkUpdate = v.compile(updateSchema);
module.exports = { checkRegister, checkUpdate };
