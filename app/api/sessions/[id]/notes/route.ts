import { NextRequest, NextResponse } from "next/server";
import { pool, ensureSchema, SessionRow } from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const { notes } = await request.json();

  if (typeof notes !== "string") {
    return NextResponse.json({ error: "notes is required" }, { status: 400 });
  }

  try {
    await ensureSchema();
    const result = await pool.query<SessionRow>(
      `UPDATE sessions SET notes = $1, updated_at = now() WHERE id = $2 RETURNING *`,
      [notes, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch {
    return NextResponse.json(
      { error: "Database is not available yet" },
      { status: 503 }
    );
  }
}
