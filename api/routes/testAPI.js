var express = require("express");
var router = express.Router();
const mysql = require('mysql');
var bodyParser = require('body-parser');
var bodyp = bodyParser.urlencoded({ extended: false });
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "316project",
  database: "FinalProduction"
});
var data;
var out;
router.use('/',function(req, res) {
  data = req.query.searchTerm;
  con.connect(function(err) {
  console.log("Connected!");
  // let sql = `Select * from course Order by average_teaching_quality DESC;`;
  let sql = `Select * from course 
  WHERE department LIKE '%`+ data+`%' OR course_number LIKE '%`+ data+`%' OR course_name LIKE '%`+ data+`%' 
  Order by average_teaching_quality DESC;`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("query result:");
    out = result;
    //console.log(result);
  });
  });
  console.log(out);
  res.send(out);
});
module.exports = router;