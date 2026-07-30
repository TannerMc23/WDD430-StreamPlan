import { NextRequest, NextResponse } from "next/server";
import { pool, ensureSchema, SessionRow } from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  await ensureSchema();
  const { id } = await params;

  const result = await pool.query<SessionRow>(
    "SELECT * FROM sessions WHERE id = $1",
    [id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

export async function PUT(request: NextRequest, { params }: Params) {
  await ensureSchema();
  const { id } = await params;
  const body = await request.json();
  const { typeId, title, scheduledDate, status, notes } = body;

  const result = await pool.query<SessionRow>(
    `UPDATE sessions
     SET type_id = COALESCE($1, type_id),
         title = COALESCE($2, title),
         scheduled_date = COALESCE($3, scheduled_date),
         status = COALESCE($4, status),
         notes = COALESCE($5, notes),
         updated_at = now()
     WHERE id = $6
     RETURNING *`,
    [typeId, title, scheduledDate, status, notes, id]
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  await ensureSchema();
  const { id } = await params;

  const result = await pool.query("DELETE FROM sessions WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
