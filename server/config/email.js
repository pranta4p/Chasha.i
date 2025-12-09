const nodemailer = require("nodemailer");
const axios=require('axios')
// const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com", // SMTP Server
//   port: 587,                    // Port
//   secure: false,                // false for 587
//   auth: {
//     user: process.env.EMAIL_USER, // Login (provided by Brevo)
//     pass: process.env.BREVO_API_KEY      // SMTP key you generated
//   },
//   connectionTimeout: 10000,  // 10 sec
//   greetingTimeout: 10000,
//   socketTimeout: 10000
// });

async function sendVerificationEmail(toEmail, verificationLink, code) {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Chasha.i", email: process.env.EMAIL },
        to: [{ email: toEmail }],
        subject: "Verify your email",
        htmlContent: `
          <p>Click to verify your email:</p>
          <a href="${verificationLink}">${verificationLink}</a>
          <br><br>
          <p>Your code: <strong>${code}</strong></p>
        `
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email API resp:", response.data);

  } catch (err) {
    console.error("Brevo API Error:", err.response?.data || err.message);
  }
}


module.exports = sendVerificationEmail;
