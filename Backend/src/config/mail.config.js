import nodemailer from 'nodemailer';

// Setup email transporter using your email provider
const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can use another service provider
  auth: {
    user: process.env.EMAIL_USER,  // Your email address
    pass: process.env.EMAIL_PASS,  // Your email password (or app-specific password)
  },
});

export default transporter;
