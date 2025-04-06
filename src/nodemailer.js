import nodemailer from 'nodemailer';

const sendMail = async (from, to, subject, text) => {
  let mailOptions = {
    from,
    to,
    subject,
    text,
  };

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent`);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

export default { sendMail };
