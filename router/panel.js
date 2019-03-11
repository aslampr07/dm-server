const express = require('express');
const mysql = require('mysql');
const pool = require("../database/database").pool

const router = express.Router()

router.get("/stats", (req, res) => {
    let response = {
        "success" : true,
        "result" : {
            "total": 100,
            "processing": 50,
            "completed": 25,
            "pending": 10
        }
    };
    res.json(response)
});

router.get("/news", (req, res) => {
    let sql = ("SELECT priority, creationTime, heading, body FROM news");
    pool.query(sql, (err, rows) => {
        if(err){
            throw err;
        }
        let response = {
            "success": true,
            "result": rows
        }
        res.json(response)
    });

});

module.exports = router