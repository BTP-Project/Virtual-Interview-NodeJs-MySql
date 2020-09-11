const express = require('express');
const mysql = require('mysql');
const app = express();
const path = require("path");

//rendering html
app.use('/static',express.static('Public'));
//root page
app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname,'HomePage.html'));
})

//rendering mysql
const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'resultpage'
})
db.connect((err) => {
  if(err) throw err;
  console.log('DATABASE CONNECTED!!!');
})

//use bodyParser() to let us get the data from a POST
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//post method to get the input feild data from recruiter side
app.post('/createtable',(req,res) => {
  console.log(req.body.recruiter);
  const recruiter = req.body.recruiter;
  let sql = `CREATE TABLE if not exists ${recruiter}(
        ID INTEGER,
        Name VARCHAR(255),
        Rating1 INTEGER,
        Rating2 INTEGER,
        Rating3 INTEGER,
        Rating INTEGER,
        PRIMARY KEY(ID))`
  db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('DATABASE CREATED!!!');
  })
})

//post method to get the input feild data from candidate side
app.post('/showtable', (req,res) => {
  console.log(req.body.candidate);
  const candidate = req.body.candidate;
  let sql = `Show TABLES LIKE '` + `${candidate}'`;
  db.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send('DATABASE CREATED!!!');
  })
})

//port
app.listen('3000',() => {
    console.log('Server Started on port 3000');
})

