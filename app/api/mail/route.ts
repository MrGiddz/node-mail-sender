// pages/api/sendEmail.js

import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";



export async function POST(req: Request) {
  try {
    // Parse the request body (this assumes you're sending JSON)
    const { to, subject, html, text } = await req.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "mail.africanedutechconference.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
      });

    const mailOptions = {
      from: '"AFRICAN EDUTECH CONFERENCE" <admin@africanedutechconference.com>', 
      to, 
      subject,
      html, 
      text
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Return a success response
    return NextResponse.json({
      message: 'Email sent successfully',
      info,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
