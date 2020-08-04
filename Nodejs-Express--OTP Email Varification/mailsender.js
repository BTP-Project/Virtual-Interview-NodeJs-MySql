var nodeMailer = require('nodemailer');
var transport=nodeMailer.createTransport({
  host:'smtp.gmail.com',
  port:587,
  secure:false,
  requireTLS:true,
  auth:{
    user:'preritkrjha2001@gmail.com',
    pass:'glennmaxwell1'
  }
})

const sendMail = function (email, otp,cb){
  var mailOptions={
    from:'preritkrjha2001@gmail.com',
    to:email,
    subject:'I m HERE NODE JS / EXPRESS',
    text:otp
  }
  transport.sendMail(mailOptions,function(error,info){
    if(error){
      cb(error,null);
    }
    else{
      cb(null,info);
    }
  })
}

module.exports = sendMail;


