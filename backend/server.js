/*
 *  Added "morgan" to log as developer
 *
 *  Also added "Notes" from example at:
 *     https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
 *
 */
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

// Added Note route
const authRoute = require('./routes/auth');
const noteRoute = require('./routes/note.routes.js');
const profileRoute = require('./routes/profile.routes.js');
const dbConfig = require('./config/database.config.js');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(express.json());
app.use('/api', authRoute);
app.use('/api', noteRoute);
app.use('/api', profileRoute);

// Have mongoose work as promise
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.listen(2400, () => { console.log("Server started: 2400") });