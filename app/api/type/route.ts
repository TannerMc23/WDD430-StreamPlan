import { NextRequest, NextResponse } from "next/server";
import { sql, ensureTypesTable } from "@/lib/db";

export async function GET() {
  await ensureTypesTable();
  const { rows } = await sql`SELECT * FROM types ORDER BY id DESC`;
  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  await ensureTypesTable();
  const body = await request.json();

  if (!body.title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const { rows } = await sql`
    INSERT INTO types (title, cover_image_url, status, owner_id)
    VALUES (${body.title}, ${body.coverImageUrl ?? null}, ${body.status ?? "active"}, ${body.ownerId ?? "placeholder-user"})
    RETURNING *;
  `;

  return NextResponse.json(rows[0], { status: 201 });
}