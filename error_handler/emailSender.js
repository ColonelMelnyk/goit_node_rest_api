const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {API_KEY} = process.env;

sgMail.setApiKey(API_KEY);

const emailSender = async (data) => {
    const email = {...data, from: "maratkiller16@gmail.com"};
    await sgMail.send(email);
    return true;
}

module.exports = emailSender;