// API endpoint that returns the recent sessions.

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  const { rows } = await pool.query(
    `SELECT * FROM sessions
     WHERE status = 'Planned' AND scheduled_date >= NOW()
     ORDER BY scheduled_date ASC`
  );
  return NextResponse.json(rows);
}