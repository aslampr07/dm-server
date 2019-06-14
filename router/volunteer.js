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

router.get("/list",(req,res)=>{
    let sql= "select Volunteer.name as volname , Volunteer.phone as volphone , Victim_Request.name as vicname , Victim_Request.location , Victim_Request.phone as viphone  from Volunteer , Victim_Request , Request_Accepted where Volunteer.ID = Request_Accepted.volunteerID and Victim_Request.ID = Request_Accepted.requestID"
    pool.query(sql,(err,rows)=>{
        if (err){
            throw err;
        }
        let selectReq = rows
        let sql = "select name, phone  from Volunteer"
        pool.query(sql,(err,rows)=>{
            if (err){
                throw err;
            }
            let response = {
                "success": true,
                "selectReq": selectReq,
                "allReq": rows
            }
            res.json(response);
        })
    })
} )


module.exports = router;