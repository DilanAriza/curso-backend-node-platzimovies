const app = require('express')();
const express = require('express')

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const { logErrors, errorHadler } = require('./utils/middleware/errorHandlers');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

moviesApi(app);

app.use(logErrors);
app.use(errorHadler);

app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});