import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const baseUrl = process.env.DOMAIN;
    const link =
      emailType === "VERIFY"
        ? `${baseUrl}/verifyemail?token=${hashedToken}`
        : `${baseUrl}/resetpassword?token=${hashedToken}`;

    // Simple and fully valid HTML (no errors)
    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
      <tr>
        <td align="center" style="padding:20px 0;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff; border-radius:8px; padding:20px; font-family:Arial,sans-serif;">
            <tr>
              <td style="text-align:center;">
                <h2 style="color:#333333;">${
                  emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"
                }</h2>
                <p style="font-size:16px; color:#555555;">
                  Click the button below to ${
                    emailType === "VERIFY"
                      ? "verify your email address"
                      : "reset your password"
                  }:
                </p>
                <p>
                  <a href="${link}" style="display:inline-block; background-color:#4F46E5; color:#ffffff; text-decoration:none; padding:12px 25px; border-radius:5px; font-weight:bold;">
                    ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
                  </a>
                </p>
                <p style="font-size:14px; color:#777777;">
                  If the button doesn’t work, copy and paste this URL into your browser:
                </p>
                <p style="word-break:break-all; font-size:13px; color:#4F46E5;">
                  ${link}
                </p>
                <hr style="border:none; border-top:1px solid #e0e0e0; margin:20px 0;"/>
                <p style="font-size:12px; color:#999999;">
                  This link will expire in 1 hour. If you didn’t request this, please ignore this email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    const mailOptions = {
      from: process.env.MAIL_FROM || "no-reply@yourapp.com",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your email address"
          : "Reset your password",
      html,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    throw new Error(error.message);
  }
};
