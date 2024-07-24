// models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }
});

module.exports = mongoose.model('Admin', AdminSchema);