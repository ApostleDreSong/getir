const mongoose = require("mongoose");

const RecordsSchema = new mongoose.Schema({});

const Records = mongoose.model("records", RecordsSchema);

module.exports = Records;