// Todo este código es para enviar un mensaje por correo electrónico
// nodemailer es una librería de Node.js que nos permite hacer el envío de un mensaje vía correo electrónico
// Para más información consultar nodemailer.js
const nodemailer = require('nodemailer');

function prueba(info){
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jesusstivenortiz@gmail.com',
      pass: '1007286993'
    }
  });

  let mailOptions = {
  from: 'jesusstivenortiz@gmail.com',
  to: info.email,
  subject: 'Sending Email using Node.js',
  html: ` <h2>Este es tu cdigo de recuperacion: ${info.code}</h2>`
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('enviado');
        window.location.href = './view/codePassword.html';
      }
  });
}

module.exports = {
  prueba,
}