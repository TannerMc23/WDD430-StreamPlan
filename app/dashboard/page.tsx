import { pool, ensureSchema, SessionRow } from "@/lib/db";
import SessionCard from "@/components/SessionCard";
import Link from "next/link";

export default async function DashboardPage() {
  await ensureSchema();

  // TODO: scope this to the authenticated user once real session-to-user lookup exists
  const result = await pool.query<SessionRow>(
    `SELECT * FROM sessions WHERE status = 'Planned' AND scheduled_date >= NOW() ORDER BY scheduled_date ASC`
  );
  const sessions = result.rows;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Dashboard</h1>
      <p className="mt-2 text-lg text-foreground">
        Welcome to your dashboard! Here you can view your upcoming sessions.
      </p>

      <div className="mt-4 flex gap-4">
        <Link href="/types/add-edit" className="text-accent hover:underline text-sm">
          + Add/Edit Type
        </Link>
        <Link href="/sessions/add-edit" className="text-accent hover:underline text-sm">
          + Add/Edit Session
        </Link>
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">Upcoming Sessions:</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sessions.length === 0 ? (
          <p className="text-zinc-400">No upcoming sessions yet.</p>
        ) : (
          sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))
        )}
      </div>
    </section>
  );
}