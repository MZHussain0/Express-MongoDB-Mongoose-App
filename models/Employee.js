const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: string,
    required: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
