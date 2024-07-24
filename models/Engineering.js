// models/Engineering.js
const mongoose = require('mongoose');

const EngineeringSchema = new mongoose.Schema({
  name: { type: String, required: true },
  project: { type: String, required: true }
});

module.exports = mongoose.model('Engineering', EngineeringSchema);
