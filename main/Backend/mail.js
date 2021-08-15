const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sameer.hassan2k2@gmail.com',
    pass: 'beawarrior12'
  },
  tls: {
    rejectUnauthorized: false
    }
});

var mailOptions = {
  from: 'sameer.hassan2k2@gmail.com',
  to: 'sameer.hasan2k2@gmail.com',
  subject: 'NEW MAIL',
  text: `hello there little programmer`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});