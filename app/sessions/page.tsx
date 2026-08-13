import { pool, ensureSchema, SessionRow } from "@/lib/db";
import SessionCard from "@/components/SessionCard";

export const dynamic = "force-dynamic";

export default async function SessionsPage() {
  // TODO: filter by the authenticated user once lib/auth.ts is merged.
  let sessions: SessionRow[] = [];
  let dbAvailable = true;

  try {
    await ensureSchema();
    const result = await pool.query<SessionRow>(
      "SELECT * FROM sessions ORDER BY scheduled_date ASC"
    );
    sessions = result.rows;
  } catch {
    dbAvailable = false;
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-xl font-semibold">Sessions</h1>
      {!dbAvailable ? (
        <p className="text-foreground">
          Database is not connected yet. Set DATABASE_URL in .env.local to see sessions here.
        </p>
      ) : sessions.length === 0 ? (
        <p className="text-foreground">
          No sessions scheduled yet. Create one to get started.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </main>
  );
}
