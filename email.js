'use strict';
const nodemailer = require('nodemailer');

const emailids = ['amit@fortiate.com, amod@fortiate.com'];
// const emailids = ["amod@fortiate.com"];

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'contact@fortiate.com',
    pass: 'maxno2-gyTpyz-hofgyh',
  },
});

async function success(action, data) {
  try {
    // send mail with defined transport object
    transporter.sendMail({
      from: '"Fortiate ' + data + '" <contact@fortiate.com>', // sender address
      to: emailids, // list of receivers
      subject: '🏁 ' + action + ' <eom>', // Subject line
      html: data,
    });

  } catch (err) {
    console.error(err);
  }

}

async function failure(action, data) {
  try {
    // send mail with defined transport object
    transporter.sendMail({
      from: '"Fortiate ' + data + '" <contact@fortiate.com>', // sender address
      to: emailids, // list of receivers
      subject: '🔥 ' + action + ' <eom>', // Subject linie
      attachments: [
        { // utf-8 string as an attachment
          filename: 'error.log',
          path: process.env.FORTIATE_HOME + '/error.log',
        }],
      html: data,
    });

  } catch (err) {
    console.error(err);
  }

}

module.exports.success = success;
module.exports.failure = failure;
