import { NextRequest, NextResponse } from "next/server";
import { pool, ensureSchema } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ genre: string }> }
) {
  await ensureSchema();
  const { genre } = await params;

  const { rows } = await pool.query(
    "SELECT * FROM types WHERE name ILIKE $1",
    [`%${genre}%`]
  );

  return NextResponse.json(rows);
}