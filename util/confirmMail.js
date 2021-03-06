const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

// Send Email confirmation
function sendEmailConfirmation(receiver, id, forname) {
  var mailOptions = {
    from: 'Webshop XYZ <infodsp.bot@gmail.com>',
    to: receiver,
    subject: 'Bestätige deine E-Mail!',
    html: '<h3>Fast fertig, '+forname+'!</h3> Bestätige deine E-Mail mit einem Klick.<br><a href="'+process.env.API_BASE_URL+'v1/users/'+id+'/confirmEmail">Jetzt bestätigen.</a>'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + receiver + "-" + id + " :::: " + info.response);
    }
  });
}

module.exports.sendEmailConfirmation = sendEmailConfirmation;
