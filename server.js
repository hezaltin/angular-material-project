const mysql = require('mysql');
const express = require('express'); // importing the express module

const bodyParser = require("body-parser") // used tp parse the request body of post request

const app = express(); //setting  the export module as app

app.use(bodyParser.json());  // method parse it in json
app.use(bodyParser.urlencoded({ extended: false }));  // method encoded the url

var mysqlConnection = mysql.createConnection({
    host :'localhost',
    user: 'root',
    password: 'password',
    database : 'employeedb'
})

mysqlConnection.connect(err=>{
    if(!err){
        console.log('DB connection succeded.');
    }
    else{
        console.log('DB connection failed due to ' + JSON.stringify(err,undefined,24));
    }
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested,Content-Type,Accept'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE,OPTIONS');
    next();
});

app.listen(3000,()=>{
    console.log('express is running')
})


app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee',(err,row,fields)=>{
        if(!err){
            res.status(200).json({
                message:'Authenticate Valid',
                rows :row
            })

        }
        else{
            console.log(err)
        }

    })
})