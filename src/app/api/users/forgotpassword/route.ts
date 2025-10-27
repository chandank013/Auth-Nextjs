import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate reset token (valid for 15 mins)
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.TOKEN_SECRET!,
      { expiresIn: "15m" }
    );

    // Send reset email via Mailtrap
    const resetLink = `${process.env.DOMAIN}/reset-password?token=${resetToken}`;

    await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
      resetLink,
    });

    return NextResponse.json({
      message: "Password reset link sent to your email.",
      success: true,
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
