import { NextResponse } from "next/server";

import { mailOptions, transporter } from "@/lib/mail";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = async (request: any) => {
  const { username, phone, email, message } = await request.json();

  try {
    await transporter.sendMail({
      ...mailOptions,
      subject: "Feedback request",
      html: `<ul>
                <li>User name: <b>${username}<b/></li>
                <li>Phone number: <b>+38-${phone}<b/></li>
                <li>Email: <b>${email}<b/></li>
                <li>Text message: <b>${message}<b/></li>
            </ul>`,
    });

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
};
