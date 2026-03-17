import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or use "smtp.ethereal.email" for testing
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use Gmail App Password (not your real password)
  },
});

export async function sendOTPEmail(email: string, otp: string, name: string) {
  const mailOptions = {
    from: `"TRCELABS Secure Portal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔐 Your TRCELABS Verification Code",
    html: `
      <!DOCTYPE html>
      <html>
        <body style="background:#0B1828; color:#ffffff; font-family:'Courier New', monospace; padding:40px;">
          <div style="max-width:480px; margin:0 auto; background:#0d1f30; border:1px solid #1f3347; border-radius:12px; padding:32px;">
            <div style="border-bottom:1px solid #1f3347; padding-bottom:20px; margin-bottom:24px;">
              <p style="color:#05DE72; font-size:11px; letter-spacing:0.2em; margin:0;">TRCELABS</p>
              <p style="color:#ffffff; font-size:20px; font-weight:bold; margin:8px 0 0;">IDENTITY VERIFICATION</p>
            </div>
            <p style="color:#9ca3af; font-size:13px; margin-bottom:8px;">Hello, <span style="color:#ffffff">${name}</span></p>
            <p style="color:#9ca3af; font-size:13px; margin-bottom:24px;">
              Your one-time verification code for TRCELABS Secure Portal:
            </p>
            <div style="background:#060f18; border:1px solid #05DE72; border-radius:8px; padding:20px; text-align:center; margin-bottom:24px;">
              <p style="color:#05DE72; font-size:36px; font-weight:bold; letter-spacing:0.4em; margin:0;">${otp}</p>
              <p style="color:#6b7280; font-size:11px; letter-spacing:0.1em; margin:8px 0 0;">VALID FOR 10 MINUTES</p>
            </div>
            <p style="color:#6b7280; font-size:11px; letter-spacing:0.1em;">
              If you did not request this, please ignore this email.
            </p>
            <div style="border-top:1px solid #1f3347; margin-top:24px; padding-top:16px; display:flex; gap:24px;">
              <span style="color:#374151; font-size:10px; letter-spacing:0.15em;">256-BIT ENC</span>
              <span style="color:#374151; font-size:10px; letter-spacing:0.15em;">ISO 27001</span>
              <span style="color:#374151; font-size:10px; letter-spacing:0.15em;">SOC 2</span>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}