import { sql } from "@vercel/postgres";

// TEMPORARY minimal schema for local dev/testing.
// Sergio owns the full schema (users, types, genres, type_genres, sessions) —
// this file will be replaced once that PR merges.
export async function ensureTypesTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS types (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      cover_image_url TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      owner_id TEXT NOT NULL DEFAULT 'placeholder-user'
    );
  `;
}

export { sql };