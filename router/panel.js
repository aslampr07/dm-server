const express = require('express');
const mysql = require('mysql');
const crypto = require('crypto')
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

router.post("/news", (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let priority = number(req.body.priority);

    let sql = mysql.format("INSERT INTO news(priority, heading, body, creationTime) VALUES(?, ?, ?, NOW())", [priority, title, body]);
    pool.query(sql, (err, rows) => {
        if(err){
            throw err;
        }
        let id = rows.insertId;
        let code = crypto.randomBytes(3).toString('HEX');
        let sql = mysql.format("UPDATE news set code = ? WHERE ID = ?", [code, id])
        pool.query(sql, (err, rows) => {
            if(err){
                throw err;
            }
            let response = {
                "success": true,
                "code": code
            }
            res.json(response);
        })
    })
})

module.exports = router