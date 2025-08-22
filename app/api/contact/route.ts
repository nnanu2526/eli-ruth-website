// Ensure this API route only runs at runtime (not during build)
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schema
const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
});

export async function POST(req: Request) {
  try {
    const form = await req.json();
    const parsed = ContactSchema.parse(form);

    // Save into DB only
    const saved = await prisma.contactMessage.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        message: parsed.message,
      },
    });

    // 👇 No email logic — DB only
    return NextResponse.json({ ok: true, saved });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Something went wrong" },
      { status: 400 }
    );
  }
}



