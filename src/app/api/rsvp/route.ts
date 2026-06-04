import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const rsvps = await db.rsvp.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(rsvps);
  } catch (error) {
    console.error("GET /api/rsvp error:", error);
    return NextResponse.json({ error: "Failed to fetch RSVPs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message, response } = body;

    if (!name || !response) {
      return NextResponse.json({ error: "Name and response are required" }, { status: 400 });
    }

    const newRsvp = await db.rsvp.create({
      data: {
        name: name.trim(),
        message: message?.trim() || null,
        response,
      },
    });

    return NextResponse.json(newRsvp, { status: 201 });
  } catch (error) {
    console.error("POST /api/rsvp error:", error);
    return NextResponse.json({ error: "Failed to submit RSVP" }, { status: 500 });
  }
}
