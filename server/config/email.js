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
// async function sendEmail(toEmail,user, verificationTxt) {
//   try {
//     const response = await axios.post(
//       "https://api.brevo.com/v3/smtp/email",
//       {
//         sender: { name: "Chasha.i", email: process.env.EMAIL },
//         to: [{ email: toEmail }],
//         subject: "Your Order ",
//         htmlContent: `
//           <p>Click to verify your email:</p>
//           <a href="${verificationLink}">${verificationLink}</a>
          
//         `
//       },
//       {
//         headers: {
//           "api-key": process.env.BREVO_API_KEY,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Email API resp:", response.data);

//   } catch (err) {
//     console.error("Brevo API Error:", err.response?.data || err.message);
//   }
// }
// async function sendEmail(toEmail, user, items) {
//   try {
//     const itemsHtml = items
//       .map(
//         (p) => `
//           <tr>
//             <td style="padding:8px;border:1px solid #ddd;">
//               <strong>${p.name}</strong><br/>
//               <small>${p.type}</small><br/>
//               ${p.description ? `<em>${p.description}</em>` : ""}
//             </td>

//             <td style="padding:8px;border:1px solid #ddd;">
//               ${p.location}
//             </td>

//             <td style="padding:8px;border:1px solid #ddd;">
//               ${p.seller}<br/>
//               <small>${p.phone}</small>
//             </td>

//             <td style="padding:8px;border:1px solid #ddd;text-align:right;">
//               ৳${p.price} / ${p.unit}
//             </td>
//           </tr>
//         `
//       )
//       .join("");

//     const response = await axios.post(
//       "https://api.brevo.com/v3/smtp/email",
//       {
//         sender: { name: "Chasha.i", email: process.env.EMAIL },
//         to: [{ email: toEmail }],
//         subject: "Your Order Confirmation — Chasha.i",
//         htmlContent: `
//           <div style="font-family:Arial,Helvetica,sans-serif;">
//             <h2>Hi ${user?.name || ""}, your order is confirmed! 🌱</h2>

//             <p>
//               Thank you for shopping with <strong>Chasha.i</strong>.<br/>
//               We’ve received your order and will contact you soon.
//             </p>

//             <h3>Your ordered products</h3>

//             <table style="border-collapse:collapse;width:100%;max-width:650px;">
//               <thead>
//                 <tr>
//                   <th style="padding:8px;border:1px solid #ddd;">Product</th>
//                   <th style="padding:8px;border:1px solid #ddd;">Location</th>
//                   <th style="padding:8px;border:1px solid #ddd;">Seller</th>
//                   <th style="padding:8px;border:1px solid #ddd;">Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${itemsHtml}
//               </tbody>
//             </table>

//             <p style="margin-top:18px;">
//               If anything looks wrong, reply to this email and we’ll fix it.
//             </p>

//             <p>— Team Chasha.i</p>
//           </div>
//         `,
//       },
//       {
//         headers: {
//           "api-key": process.env.BREVO_API_KEY,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Email API resp:", response.data);
//   } catch (err) {
//     console.error("Brevo API Error:", err.response?.data || err.message);
//   }
// }



module.exports = sendVerificationEmail;
