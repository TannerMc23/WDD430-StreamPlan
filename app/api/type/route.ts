import { NextRequest, NextResponse } from "next/server";
import { pool, ensureSchema } from "@/lib/db";

export async function GET() {
  await ensureSchema();
  const { rows } = await pool.query("SELECT * FROM types ORDER BY id DESC");
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  await ensureSchema();
  const body = await request.json();

  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  // TODO: replace hardcoded user_id once session-based auth is wired to real user lookups
  const { rows } = await pool.query(
    `INSERT INTO types (user_id, name, notes, status)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [body.userId ?? 1, body.name, body.notes ?? null, body.status ?? "Active"]
  );

  return NextResponse.json(rows[0], { status: 201 });
}