import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { rows } = await sql`SELECT * FROM types WHERE id = ${id}`;
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
  const { rows } = await sql`
    UPDATE types
    SET title = ${body.title}, cover_image_url = ${body.coverImageUrl ?? null}, status = ${body.status}
    WHERE id = ${id}
    RETURNING *;
  `;
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
  const { rows } = await sql`DELETE FROM types WHERE id = ${id} RETURNING *;`;
  if (rows.length === 0) {
    return NextResponse.json({ error: "Type not found" }, { status: 404 });
  }
  return NextResponse.json({ deleted: true });
}