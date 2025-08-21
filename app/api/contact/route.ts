export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import nodemailer from "nodemailer";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
});

export async function POST(req: Request) {
  try {
    const form = await req.json();
    const parsed = ContactSchema.parse(form);

    // Save to DB
    const saved = await prisma.contactMessage.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        message: parsed.message,
      },
    });

    // Only try email if vars exist
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Eli Ruth Website" <${process.env.EMAIL_USER}>`,
        to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
        subject: "📩 New Contact Form Submission",
        text: `From: ${parsed.name} <${parsed.email}>\n\n${parsed.message}`,
      });
    } else {
      console.log("⚠️ Email skipped: EMAIL_USER or EMAIL_PASS not set");
    }

    return NextResponse.json({ ok: true, saved });
  } catch (err: any) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Something went wrong" },
      { status: 400 }
    );
  }
}


