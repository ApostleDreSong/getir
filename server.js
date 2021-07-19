const express = require('express');
const app = express();
require('dotenv').config();
require('./Utils/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

const recordRoute = require('./Routes/recordRoute');

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
// The supertest module in the test files will bind the App to random ports in the test environments
// so we do not need to explicitly declare a port for the App in Test environment

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT);
}