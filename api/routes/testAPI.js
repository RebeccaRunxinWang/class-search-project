var express = require("express");
var router = express.Router();
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "316project",
  database: "project"
});
var data;
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = `Select * from course 
  Order by average_teaching_quality DESC;`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("The best class:");
    data = result[0].course_number;
    console.log(result[0].course_number);
  });
});
router.get("/", function(req, res, next) {
    console.log(data);
    res.send(data);
});
module.exports = router;