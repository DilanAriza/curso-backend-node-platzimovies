const app = require('express')();
const express = require('express')

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const { logErrors, errorHadler, wrapError } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
moviesApi(app);

//Not Found Handler - Catch 404
app.use(notFoundHandler);

//Errors middleware
app.use(logErrors);
app.use(wrapError)
app.use(errorHadler);


app.listen(config.port, function() {
    console.log(`Listening http://localhost:${config.port}`);
});