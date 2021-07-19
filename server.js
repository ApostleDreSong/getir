const express = require('express');
const app = express();
require('dotenv').config();
require('./Utils/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;
// Route
const recordRoute = require('./Routes/recordRoute');

// Path
app.use('/records', recordRoute);

app.use((err, req, res, next) => {
    if (!err) return next();
    res.status(err.httpStatusCode || 500);
});

app.use((req, res) => {
    res.status(404).json({
        message: 'Requested resource not found',
    });
});

module.exports = app;
if (process.env.NODE_env !== "test") {
    app.listen(PORT);
}