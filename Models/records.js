const mongoose = require("mongoose");

const RecordsSchema = new mongoose.Schema({}, { collection: 'records' });

const Records = mongoose.model("records", RecordsSchema);

module.exports = Records;