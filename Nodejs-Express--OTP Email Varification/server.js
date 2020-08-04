const express = require('express');
const path = require('path');

const sendMail = require('./mailsender')

const app = express();

var otp = Math.floor((Math.random() * 100) + 1);
otp=otp+10000;

otp="OTP is -- "+otp;



app.use('/static',express.static('public'))

//chunk 2
//DATA PARSING FROM HTML
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.post('/email',function (req,res){
  //send email here

  console.log( req.body);
  const { email }=req.body;
  sendMail(email , otp ,function (error,info){
    if(error){
      res.status(500).json({message: 'Internal Error'});
    }
    else{
      res.json({message: 'Email sent!!!!'})
    }
  });

  res.json({ message: 'Message Recieved'})
});


app.post('/varifyotp',function (req,res){
  //send email here

  console.log( req.body);
  const { otpvarify }=req.body;
  var xx = req.body;
  xx = xx.email;

  xx="OTP is -- "+xx;
  console.log(xx);
  console.log(otp);
  if(xx==otp){
    console.log("okk");
  }
  else{
    console.log("error");
  }

  res.json({ message: 'Message Recieved'})
});



app.get('/',function (req,res){
  res.sendFile(path.join(__dirname,'/login.html'));
});


console.log("TRUE");

app.listen(3000);
