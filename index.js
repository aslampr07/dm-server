 const express = require('express');

 const app = express();


app.get("/test", function(req, res){
    let name = req.query.name
    res.send(`Hai ${name}`);
});

 app.listen(8000);