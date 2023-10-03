const nodemailer = require('nodemailer');
require("dotenv").config();
const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "mr.melnyk2024@meta.ua",
        pass: META_PASSWORD
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const emailSender = data => {
    const email = { 
        to: "pisiros991@klanze.com",
        subject: "Test email",
        html: "<p><strong>Test email</strong> from localhost:3000</p>", 
        from: "mr.melnyk2024@meta.ua" };
    return transport.sendMail(email);
};

module.exports = emailSender;