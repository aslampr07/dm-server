const express = require('express');
const pool = require('./database/database').pool;
const mysql = require('mysql')
const app = express();

app.use(express.urlencoded({ extended: true }));


//Routes
app.use("/volunteer", require('./router/volunteer'));
app.use("/victim", require('./router/victim'));

app.listen(8000, () => {
    console.log("Server is listening")
});