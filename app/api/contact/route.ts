// ✅ Ensure this API route is always runtime, never pre-rendered at build
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import nodemailer from "nodemailer";

// ✅ Validation schema with zod
const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request
    const parsed = ContactSchema.parse(body);

    // ✅ Save message into DB
    const saved = await prisma.contactMessage.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        message: parsed.message,
      },
    });

    // ✅ Optional email notifications (only if env vars set)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.NOTIFY_EMAIL) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Eli Ruth Website" <${process.env.EMAIL_USER}>`,
          to: process.env.NOTIFY_EMAIL, // set this in .env
          subject: "New Contact Form Submission",
          text: `From: ${parsed.name} <${parsed.email}>\n\n${parsed.message}`,
        });
      } catch (mailErr: any) {
        console.error("Email sending failed:", mailErr.message);
        // don’t throw — DB save should succeed even if email fails
      }
    }

    return NextResponse.json({ ok: true, saved });
  } catch (err: any) {
    console.error("Contact API error:", err);

    // Zod validation errors
    if (err.errors && Array.isArray(err.errors)) {
      return NextResponse.json(
        { ok: false, error: "Validation failed", details: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: err.message || "Unexpected error" },
      { status: 500 }
    );
  }
}




