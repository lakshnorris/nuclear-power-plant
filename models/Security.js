// models/Security.js
const mongoose = require('mongoose');

const SecuritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  clearanceLevel: { type: String, required: true }
});

module.exports = mongoose.model('Security', SecuritySchema);
