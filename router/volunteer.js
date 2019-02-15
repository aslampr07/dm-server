const express = require('express');

const pool = require('../database/database').pool;
const mysql = require('mysql');

const router = express.Router()

router.post("/register", function (req, res) {
    let name = req.body.name;
    let phone = String(req.body.phone);
    let lat = Number(req.body.lat);
    let lon = Number(req.body.lon);

    if (/^\+91[0-9]{10}$/.test(phone)) {
        let sql = mysql.format(`INSERT INTO Volunteer(name, phone, latitude, longitude, creationTime) VALUES (?, ?, ?, ?, NOW()) 
                                                ON DUPLICATE KEY UPDATE
                                                name = ?, phone = ?, latitude = ?, longitude = ?, creationTime = NOW()`, 
                                                [name, phone, lat, lon, name, phone, lat, lon]);
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
    }
    else {
        let response = {
            "success": false,
            "type": 101
        }
        res.json(response);
    }

});


module.exports = router;