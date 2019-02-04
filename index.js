const express = require('express');
const pool = require('./database/database').pool;
const mysql = require('mysql')
const app = express();

app.use(express.urlencoded({extended:true}));

app.post("/volunteer/register", function (req, res) {
    let name = req.body.name;
    let phone = req.body.phone;
    let lat = Number(req.body.lat);
    let lon = Number(req.body.lon);

    let sql = mysql.format("INSERT INTO Volunteer(name, phone, latitude, longitude) VALUES (?, ?, ?, ?)", [name, phone, lat, lon]);

    pool.query(sql, function (err, rows) {
        if (err) {
            throw err;
        }
        console.log("data inserted");
        let response = {
            "success": true
        }
        res.send(response)
    });
});

app.listen(8000, () => {
    console.log("Server is listening")
});