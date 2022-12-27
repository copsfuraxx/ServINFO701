const app = require("express")();
const http = require("http").Server(app);
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'android',
  password: 'info705',
  database: 'info705'
});

//Connect le serveur a la base de donée
connection.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
});

//Ajout d'un nouvel utilisateur
app.get("/INSERT_USER", function (req, res) {
    if (req.query.nom == null || req.query.nom.length < 3) {
        res.send("err");
        return;
    }
    var sql = "SELECT * FROM user WHERE nom = '" + req.query.nom + "'";
    connection.query(sql, function (err, result) {
        try{
            if (err) throw err;
            if (result.length == 0){   
                sql = "INSERT INTO user (nom) VALUES ('" + req.query.nom + "')";
                connection.query(sql, function (err, result) {
                    try{
                        if (err) throw err;
                        res.send("ok");
                    }catch(err){
                        res.send("err");
                    }
                });
            }
            else{
                res.send("ok");
            }
        }catch(err){
            res.send("err");
        }
    });
});

//Ajout d'un score
app.get("/INSERT_SCORE", function (req, res) {
    if (req.query.nom == null || req.query.score == null) {
        res.send("err");
        return;
    }
    var sql = "UPDATE user SET dernier_score = '" + req.query.score + "' WHERE nom = '" + req.query.nom + "'";
    connection.query(sql, function (err, result) {
        try{
            if (err) throw err;
            res.send("ok");
        }catch(err){
            res.send("err");
        }
    });
    sql = "UPDATE user SET top_score = '" + req.query.score + "' WHERE nom = '" + req.query.nom + "' AND top_score < " + req.query.score;
    connection.query(sql, function (err, result) {
        try{
            if (err) throw err;
        }catch(err){
        }
    });
});


//Envoie les 5 meilleurs scores
app.get("/TOP_SCORE", function (req, res) {
    var sql = "SELECT nom, top_score FROM user ORDER BY top_score DESC LIMIT 5";
    connection.query(sql, function (err, result) {
        try{
            if (err) throw err;
            res.json(result);
        }catch(err){
            res.send("err");
        }
    });
});

//Lance le serveur
http.listen(3000, function () {
    console.log("listening on localhost:3000");
});