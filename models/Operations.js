// models/Operations.js
const mongoose = require('mongoose');

const OperationsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shift: { type: String, required: true }
});

module.exports = mongoose.model('Operations', OperationsSchema);
