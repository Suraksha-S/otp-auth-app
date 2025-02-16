
import express from 'express'
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())

let otpData = {}; // In-memory storage for OTPs

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'surakshams553@gmail.com',
    pass: 'zhwx mmtj omxp yuvz',
  },
});


// Generate and send OTP
app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 30000; // 30 seconds from now

  otpData[email] = { otp, expiresAt };

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It will expire in 30 seconds.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending OTP');
    }
    res.status(200).send('OTP sent');
    console.log(`your OTP is ${otp}`)
  });
});

// Verify OTP
app.post('/verify-otp', (req, res) => {
  const { email,  otp } = req.body;
  const userOtpData = otpData[email];

  if (!userOtpData) {
    return res.status(400).send('OTP not found. Please request a new one.');
  }

  const { otp: storedOtp, expiresAt } = userOtpData;

  if (Date.now() > expiresAt) {
    delete otpData[email];
    return res.status(400).send('OTP expired. Please request a new one.');
  }

  if (otp === storedOtp) {
    delete otpData[email];
    return res.status(200).send('OTP verified successfully');
  } else {
    return res.status(400).send('Invalid OTP. Please try again.');
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

