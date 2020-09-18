const express = require('express');
const app = express();
const path = require('path');

//rendering html
app.use('/static',express.static('Public'));
//root page

app.get('/',function (req,res){
  res.sendFile(path.join(__dirname,'/feedback.html'))
})

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var nodeMailer = require('nodemailer');
var transport=nodeMailer.createTransport({
  host:'smtp.gmail.com',
  port:587,
  secure:false,
  requireTLS:true,
  auth:{
    user:'virtualinterviewbtp@gmail.com',
    pass:'abc123@a'
  }
})

app.post('/feedback',(req,res) => {

  var mis = req.body.MISNo;
  var feedback = req.body.Feedback;
  var subject = req.body.Subject;

  console.log(req.body.feedback);

  var mailOptions={
    from:'preritkrjha2001@gmail.com',
    to:'virtualinterviewbtp@gmail.com',
    subject:mis+' '+subject,
    text:feedback
  }
  transport.sendMail(mailOptions,function(error,info){
    if(error){
      console.warn(error);
    }
    else{
      console.warn("EMAIL sent",info.responce);
      res.send('Thank You For Investing Your time to give Valuable feedback . We respect your patience. Thank You !!!');
    }
  })

})


app.listen('3001',() => {
  console.log("port - 3001");
});
