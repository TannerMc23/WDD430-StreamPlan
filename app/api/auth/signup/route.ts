import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { pool, ensureSchema } from "@/lib/db";

export async function POST(request: NextRequest) {
  await ensureSchema();
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  try {
    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: "An account with that email already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
      [email, passwordHash]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: "Database is not available yet" }, { status: 503 });
  }
}