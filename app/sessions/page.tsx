import { pool, ensureSchema, SessionRow } from "@/lib/db";
import SessionCard from "@/components/SessionCard";

export const dynamic = "force-dynamic";

export default async function SessionsPage() {
  await ensureSchema();

  // TODO: filter by the authenticated user once lib/auth.ts is merged.
  const result = await pool.query<SessionRow>(
    "SELECT * FROM sessions ORDER BY scheduled_date ASC"
  );
  const sessions = result.rows;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-xl font-semibold">Sessions</h1>
      {sessions.length === 0 ? (
        <p className="text-foreground/70">
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
