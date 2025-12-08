const nodemailer = require("nodemailer");
const axios=require('axios')
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", // SMTP Server
  port: 587,                    // Port
  secure: false,                // false for 587
  auth: {
    user: process.env.EMAIL_USER, // Login (provided by Brevo)
    pass: process.env.BREVO_API_KEY      // SMTP key you generated
  }
});

async function sendVerificationEmail(toEmail, verificationLink,code) {
  const mailOptions = {
    from: `"Chasha.i" <${process.env.EMAIL}>`, // must match Login
    to: toEmail,
    subject: "Verify your email",
    html: `<p>Click the link to verify your email:</p>
           <a href="${verificationLink}">${verificationLink}</a>
           <br><p>Or use this code :<h1> ${code} </h1></p>`
  };

   try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.messageId);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

module.exports = sendVerificationEmail;
