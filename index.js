const express = require('express');
const pool = require('./database/database').pool;
const mysql = require('mysql')
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Routes
app.use("/volunteer", require('./router/volunteer'));
app.use("/victim", require('./router/victim'));
app.use("/panel", require("./router/panel"));

app.listen(8000, () => {
    console.log("Server is listening")
});