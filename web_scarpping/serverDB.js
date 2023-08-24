const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/user", () => {
  console.log("connected to mongoDB");
});
