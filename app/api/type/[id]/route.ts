import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { rows } = await pool.query("SELECT * FROM types WHERE id = $1", [id]);
  if (rows.length === 0) {
    return NextResponse.json({ error: "Type not found" }, { status: 404 });
  }
  return NextResponse.json(rows[0]);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { rows } = await pool.query(
    `UPDATE types SET name = $1, notes = $2, status = $3 WHERE id = $4 RETURNING *`,
    [body.name, body.notes ?? null, body.status, id]
  );
  if (rows.length === 0) {
    return NextResponse.json({ error: "Type not found" }, { status: 404 });
  }
  return NextResponse.json(rows[0]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { rows } = await pool.query("DELETE FROM types WHERE id = $1 RETURNING *", [id]);
  if (rows.length === 0) {
    return NextResponse.json({ error: "Type not found" }, { status: 404 });
  }
  return NextResponse.json({ deleted: true });
}