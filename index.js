const express = require('express');
const pool = require('./database/database').pool;
const mysql = require('mysql')
const app = express();

app.use(express.urlencoded({ extended: true }));

/*
app.post("/volunteer/register", function (req, res) {
    let name = req.body.name;
    let phone = req.body.phone;
    let lat = Number(req.body.lat);
    let lon = Number(req.body.lon);

    //validating the phone only, name validation is added later
    validateResponse(phone, (err) => {
        //err will be true when there is NO error.
        if (err) {
            let sql = mysql.format("INSERT INTO Volunteer(name, phone, latitude, longitude, creationTime) VALUES (?, ?, ?, ?, NOW() )", [name, phone, lat, lon]);
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
        else{
            let response = {
                "success" : false,
                "type" : 101
            }
            res.json(response);
        }
    });

});

function validateResponse(phone, cb) {
    if (!/^\+91[0-9]{10}^/.test(phone)) {
        cb(false)
    }
    else{
        cb(true)
    }
}
*/

app.use("/volunteer", require('./router/volunteer'));

app.listen(8000, () => {
    console.log("Server is listening")
});