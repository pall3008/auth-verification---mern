import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
     host :"smtp-relay.brevo.com",
     port : 587,
     secure: false, // TLS is used but not on port 465
     requireTLS: true,

     auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
     }
});

export default transporter;