const express = require('express');
const mysql = require('mysql');
const app = express();
const fs = require('fs');
const path = require("path");

var recruter1;
var candidate1;
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
    database: 'phpmyadmin'
})
let dbb ={
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'phpmyadmin'
};
//use bodyParser() to let us get the data from a POST
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'))
//post method to get the input feild data from recruiter side



app.post('/createtable',(req,res) => {


    console.log(req.body.recruiter);
    const recruiter = req.body.recruiter;
    recruter1 = recruiter;
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
        app.use('/',function (req,res)
        {
            res.sendFile(path.join(__dirname,'/Public/user1.html'));
        })


    })
})

//post method to get the input feild data from candidate side




app.get('/sql',function (req,res)
{
    var name = req.query.Name;
    var mis=req.query.MisNumber;
    var dsa=req.query.DSA;
    var coding=req.query.CodingSkill;
    var comm=req.query.CommunicationSkill;
    var over=req.query.OverallSkill;
    if(mis==='')
    {
        return res.redirect('/user1.html');
    }
    else if(name==='')
    {
        return res.redirect('/user1.html');
    }
    else if(dsa==='')
    {
        return res.redirect('/user1.html');
    }
    else if(coding==='')
    {
        return res.redirect('/user1.html');
    }
    else if(comm==='')
    {
        return res.redirect('/user1.html');
    }
    else if(over==='')
    {
        return res.redirect('/user1.html');
    }
    //console.log('DATABASE CONNECTED!!!');
    let mysql = require('mysql');
    let connection = mysql.createConnection(dbb);
    let sql =`INSERT INTO ${recruter1}(ID,Name ,Rating1,Rating2,Rating3,Rating) VALUES (${mis},'${name}',${dsa},${coding},${comm},${over});`;

    connection.query(sql,function (error,result,fields){
        if(!!error){
            // alert(
            console.log('error');
        }else{
            // console.log(candidate1);
            console.log("success");
            return res.sendFile(path.join(__dirname,'/HomePage.html'));

        }
    })

})

app.post('/showtable', (req,res) => {
    console.log(req.body.candidate);
    const candidate = req.body.candidate;
    candidate1 = candidate;
    let sql = `Show TABLES LIKE '` + `${candidate}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('DATABASE CREATED!!!');
    })
    let mysql = require('mysql');
    let connection = mysql.createConnection(dbb);
    // console.log(markks);

    sql=`SELECT * FROM ${candidate1};`;
    connection.query(sql,function (err,result)
    {
        if(err) throw err;

    })

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.get('/user',function (req,res)
    {
        connection.query(sql,function (err,rows,fields)
        {
            if(err) throw err;
            res.render('user',{title:"Student Details",items:rows})
        })
    })

})



app.listen('3000',() => {
    console.log('Server Started on port 3000');
})

