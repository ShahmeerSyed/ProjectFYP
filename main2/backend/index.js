const express = require(`express`)
const mysql = require('mysql')
const app = express();
const cors = require('cors')
const bodyparser = require(`body-parser`);
const e = require('express');

app.use(bodyparser.urlencoded({extended: true}))
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'employeedata'
})

app.get('/', function (req,res){
    res.send('Backend Running Smoothly')
  })

  db.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log(`Server Connection Successful`)
    }
})

app.post(`/api/get`,(req,res)=>{
    ID = req.body.ID
    NAME = req.body.NAME

    const sqlSelect = "SELECT * FROM validation WHERE id = ? AND name = ? LIMIT 1;"
    db.query(sqlSelect,[ID, NAME],(err,result)=>{
    //   console.log(result)
      res.send(result)
    })
})

app.post(`/api/post`,(req,res)=>{
    ID = req.body.ID
    NAME = req.body.NAME

    const sqlInsert = "INSERT INTO mess (`id` , `name`) VALUES (?,?);"
    db.query(sqlInsert,[ID, NAME],(err, result)=>{
        console.log(err)
    })
})

app.listen(3002, ()=>console.log(`server started`))