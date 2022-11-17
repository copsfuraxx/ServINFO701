const app = require("express")();
const http = require("http").Server(app);
const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'android',
  password: 'info705',
  database: 'info705'
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
});

app.get("/INSERT_USER", function (req, res) {
    if (req.query.nom == null) {
        res.send("err");
        return;
    }
    var sql = "INSERT INTO user (nom) VALUES ('" + req.query.nom + "')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.send("ok");
    });
});


app.get("/INSERT_SCORE", function (req, res) {
    if (req.query.nom == null || req.query.score == null) {
        res.send("err");
        return;
    }
    var sql = "UPDATE user SET dernier_score = '" + req.query.score + "' WHERE nom = '" + req.query.nom + "'";
    connection.query(sql, function (err, result) {
        if (err) throw err;
    });
    var sql = "UPDATE user SET top_score = '" + req.query.score + "' WHERE nom = '" + req.query.nom + "' AND top_score < " + req.query.score;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.send("ok");
    });
});

app.get("/TOP_SCORE", function (req, res) {
    var sql = "SELECT nom, top_score FROM user ORDER BY top_score DESC";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

http.listen(3000, function () {
    console.log("listening on *:3000");
});