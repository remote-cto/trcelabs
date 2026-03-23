import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: Boolean(process.env.EMAIL_SECURE) || false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface ContactFormData {
  name: string;
  email: string;
  message: string; // ✅ updated from "textarea"
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    if (!body.name || !body.email || !body.message) { // ✅ updated
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const userMailOptions = {
      from: process.env.EMAIL_FROM,
      to: body.email,
      subject: "Thank You for Your Message",
      html: `
        <h1>Thank You for Contacting Us</h1>
        <p>Hello ${body.name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,</p>
        <p>The TRCELABS Team</p>
      `,
    };

    const hostMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM,
      subject: "New Inquiry Form Submission",
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>From:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Briefing / Requirements:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${body.message.replace(/\n/g, '<br>')} // ✅ updated
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(hostMailOptions),
    ]);

    return NextResponse.json(
      { message: "Your message has been sent. Thank you!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}