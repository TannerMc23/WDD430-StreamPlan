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
  if (!body.userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO types (user_id, name, notes, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [body.userId, body.name, body.notes ?? null, body.status ?? "Active"]
    );
    return NextResponse.json(rows[0], { status: 201 });
  } catch (err: any) {
    if (err.code === "23503") {
      return NextResponse.json(
        { error: "That User ID doesn't exist. Check the ID and try again." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Database is not available yet" }, { status: 503 });
  }
}