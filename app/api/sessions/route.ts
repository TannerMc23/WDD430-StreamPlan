import { NextRequest, NextResponse } from "next/server";
import { pool, ensureSchema, SessionRow } from "@/lib/db";

export async function GET(request: NextRequest) {
  await ensureSchema();

  // TODO: read the user id from the session once lib/auth.ts is merged.
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const result = await pool.query<SessionRow>(
    "SELECT * FROM sessions WHERE user_id = $1 ORDER BY scheduled_date ASC",
    [userId]
  );

  return NextResponse.json(result.rows);
}

export async function POST(request: NextRequest) {
  await ensureSchema();

  const body = await request.json();
  const { userId, typeId, title, scheduledDate, notes } = body;

  if (!userId || !title || !scheduledDate) {
    return NextResponse.json(
      { error: "userId, title, and scheduledDate are required" },
      { status: 400 }
    );
  }

  const result = await pool.query<SessionRow>(
    `INSERT INTO sessions (user_id, type_id, title, scheduled_date, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, typeId ?? null, title, scheduledDate, notes ?? null]
  );

  return NextResponse.json(result.rows[0], { status: 201 });
}
