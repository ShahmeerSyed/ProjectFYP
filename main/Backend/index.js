const express = require(`express`)
const mysql = require('mysql')
const app = express();
const cors = require('cors')
const bodyparser = require(`body-parser`)
const nodemailer = require(`nodemailer`)
require('dotenv').config()

app.use(bodyparser.urlencoded({extended: true}))
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
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

// posting for guest data
app.post (`/api/insert`, (req,res)=>{
  const NAME = req.body.NAME 
    const EMAIL = req.body.EMAIL
    const CNIC = req.body.CNIC
    const HOST = req.body.HOST
    const MESSAGE = req.body.MESSAGE 
    const FROM = req.body.FROM
    const TO = req.body.TO

    const sqlInsert = "INSERT INTO guest (`name`, `email`, `CNIC`, `host`, `message`, `from`, `to`) VALUES (?,?,?,?,?,?,?);"
    db.query(sqlInsert,[NAME, EMAIL, CNIC, HOST, MESSAGE, FROM, TO],(err, result)=>{
        console.log(err)
    })
    const sqlSelect = "SELECT * FROM details WHERE name = ?;"
    db.query(sqlSelect,[HOST],(err,result)=>{
      // console.log(result)
      res.send(result)
    })
})

// emailing for guest data
app.post(`/api/mail`, (req,res)=>{
    const NAME = req.body.NAME 
    const EMAIL = req.body.EMAIL
    const CNIC = req.body.CNIC
    const HOST = req.body.HOST
    const MESSAGE = req.body.MESSAGE 
    const FROM = req.body.FROM
    const TO = req.body.TO

    

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
    });
      
    var mailOptions = {
        from: 'GUEST',
        to: process.env.MESS_EMAIL,
        subject:`GUEST ${NAME}`,
        html: `
            <h3> Information </h3>
            <ul>
                <li>name: ${NAME}</li>
                <li>email: ${EMAIL}</li>
                <li>CNIC: ${CNIC}</li>
                <li>host: ${HOST}</li>
                <li>message: ${MESSAGE}</li>
                <li>from: ${FROM}</li>
                <li>to: ${TO}</li>
            </ul>    
        `
    };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
})

// posting for employee data
app.post(`/api/insert2`, (req,res)=>{
    const NAME = req.body.NAME 
    const EMAIL = req.body.EMAIL
    const ID = req.body.ID

  const sqlSelect = "SELECT * FROM VALIDATION WHERE id = ? AND name = ?;"
  db.query(sqlSelect,[ID,NAME],(err,result)=>{
    console.log(result)
    res.send(result)
  })

    
})

// validationg employee data
app.post(`/api/employeeInsert`, (req,res)=>{
  const ID = req.body.ID
  const NAME = req.body.NAME
  const EMAIL =req.body.EMAIL

  const sqlInsert = "INSERT INTO employee (`id`, `name`, `email`) VALUES (?,?,?);"
    db.query(sqlInsert,[ID, NAME, EMAIL],(err, result)=>{
        console.log(err);
        res.send("hello")
    })

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
    });
      
    var mailOptions = {
        from: 'GUEST',
        to: process.env.MESS_EMAIL,
        subject:`Employee ${NAME}`,
        html: `
            <h3> Information </h3>
            <ul>
                <li>employee ID: ${ID}</li>
                <li>name: ${NAME}</li>
                <li>email: ${EMAIL}</li>
            </ul>    
        `
    };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

})

// sending email to host
app.post(`/api/emailToHost`, (req,res)=>{
  const NAME = req.body.NAME 
    const EMAIL = req.body.EMAIL
    const CNIC = req.body.CNIC
    const MESSAGE = req.body.MESSAGE
    const EMAILING = req.body.EMAILING

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
  });
    
  var mailOptions = {
      from: 'GUEST',
      to: `${EMAILING}`,
      subject:`${NAME}`,
      html: `
          <h3> ${NAME} is here to meet you </h3>
          His Message : <h4>${MESSAGE}</h4>
          <ul>
              <li>name: ${NAME}</li>
              <li>email: ${EMAIL}</li>
              <li>CNIC: ${CNIC}</li>
          </ul>    
      `
  };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
})

// getting data of guests
app.get('/guestdata', (req,res)=>{
  db.query("SELECT * FROM guest", (err, result)=>{
    if(err){
      console.log(err);
    }
    else(
      res.send(result)
    )
  })
})

// getting data of employees
app.get('/employeedata', (req,res)=>{
  db.query("SELECT * FROM employee", (err, result)=>{
    if(err){
      console.log(err);
    }
    else(
      res.send(result)
    )
  })
})

app.listen(process.env.PORT, ()=>console.log(`server started`))