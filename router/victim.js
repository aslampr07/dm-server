const express = require('express')
const mysql = require('mysql')
const pool = require('../database/database').pool;
const moment = require('moment')


const router = express.Router();

router.post("/ticket/create", (req, res) => {
    let name = req.body.name;
    let phone = req.body.phone;
    let location = req.body.location;
    let latitude = req.body.lat;
    let longitude = req.body.lon;

    if (/^\+91[0-9]{10}$/.test(phone)) {
        let sql = mysql.format(`INSERT INTO Victim_Request(name, phone, location, latitude, longitude, requestTime)
                                         VALUES (?, ?, ?, ?, ?, NOW())`, [name, phone, location, latitude, longitude]);

        pool.query(sql, (err, rows) => {
            if (err) {
                throw err;
            }
            let response = {
                "success": true
            }
            res.json(response);
            console.log("Got new ticket, and is inserted");
        });
    }
    else {
        let response = {
            "success": false,
            "type": 101
        }
        res.json(response)
    }
})

router.get("/requests", (req, res) => {
    let limit = Number(req.query.limit);
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);

    //
    if (lat && lon ) {

        //Request for Smartphone client
        let sql = mysql.format("SELECT name, phone, requestTime, location, latitude, longitude, calculate_distance(latitude, longitude, ?, ?) as distance FROM Victim_Request ORDER BY distance", [lat, lon]);

        pool.query(sql, (err, rows) => {
            if(err){
                throw err;
            }
            else{
                rows.map(function(obj){
                    let requestTime = moment(obj.requestTime);
                    let now = moment(new Date());
                    let duration = moment.duration(now.diff(requestTime));
                    let timeTaken = parseInt(duration.asMinutes())
                    obj.timeTaken = timeTaken
                })
                let response = {
                    "success" : true,
                    "result" : rows
                }
                res.json(response)
            }
        })
    }
    else {
        let sql = mysql.format("SELECT name, phone, location, latitude, longitude, requestTime FROM Victim_Request ORDER BY requestTime LIMIT ?", [limit]);
        pool.query(sql, function (err, rows) {
            if (err) {
                throw err;
            }

            let response = {
                "successs": true,
                "result": rows
            }
            res.json(response);
        });
    }
});

router.get("/request/expand", (req, res) => {
    let phone = req.query.phone

    let sql = mysql.format("SELECT * FROM Victim_Request WHERE phone = ?", [phone]);
    console.log(sql);
    pool.query(sql, (err, rows) => {
        if(err){
            throw err
        }
        if(rows.length > 0){
            delete rows[0].ID
            let response = {
                "success" : true,
                "result" : rows[0]
            }
            res.json(response)
        }
        else{
            let response = {
                "success" : false,
                "type" : 101
            }
            res.json(response);
        }
    });
});

module.exports = router