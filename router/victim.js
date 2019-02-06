const express = require('express')
const mysql = require('mysql')
const pool = require('../database/database').pool;


const router = express.Router();

router.post("/ticket/create", (req, res) => {
    let name = req.body.name;
    let phone = req.body.phone;
    let location = req.body.location;
    let latitude = req.body.lat;
    let longitude = req.body.lon;

    if(/^\+91[0-9]{10}$/.test(phone)){
        let sql = mysql.format(`INSERT INTO Victim_Request(name, phone, location, latitude, longitude, requestTime)
                                         VALUES (?, ?, ?, ?, ?, NOW())`, [name, phone, location, latitude, longitude]);

        pool.query(sql, (err, rows) => {
            if(err){
                throw err;
            }
            let response = {
                "success" : true
            }
            res.json(response);
            console.log("Got new ticket, and is inserted");
        });
    }
    else{
        let response = {
            "success" : false,
            "type" : 101
        }
        res.json(response)
    }

})

module.exports = router