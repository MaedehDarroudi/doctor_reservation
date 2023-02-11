var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'noban_db',
    // insecureAuth: true
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con

