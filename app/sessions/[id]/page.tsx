import { notFound } from "next/navigation";
import { pool, ensureSchema, SessionRow } from "@/lib/db";
import SessionNotesForm from "@/components/SessionNotesForm";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

async function getSession(id: string): Promise<(SessionRow & { type_name: string | null }) | null> {
  await ensureSchema();
  const result = await pool.query<SessionRow & { type_name: string | null }>(
    `SELECT sessions.*, types.name AS type_name
     FROM sessions
     LEFT JOIN types ON sessions.type_id = types.id
     WHERE sessions.id = $1`,
    [id]
  );
  return result.rows[0] ?? null;
}

export default async function SessionDetailPage({ params }: Params) {
  // TODO: filter by the authenticated user once lib/auth.ts is merged.
  const { id } = await params;

  let session: (SessionRow & { type_name: string | null }) | null = null;
  let dbAvailable = true;

  try {
    session = await getSession(id);
  } catch {
    dbAvailable = false;
  }

  if (!dbAvailable) {
    return (
      <main className="mx-auto max-w-2xl p-6">
        <p className="text-foreground/70">
          Database is not connected yet. Set DATABASE_URL in .env.local to see this session.
        </p>
      </main>
    );
  }

  if (!session) notFound();

  const date = new Date(session.scheduled_date).toLocaleString();

  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-semibold wrap-break-word">{session.title}</h1>
          <span className="shrink-0 rounded-full bg-black border border-white px-2 py-0.5 text-xs uppercase">
            {session.status}
          </span>
        </div>
        <p className="mt-1 text-sm text-foreground">{date}</p>
        {session.type_name && (
          <p className="mt-1 text-sm text-foreground">Type: {session.type_name}</p>
        )}

        <SessionNotesForm sessionId={session.id} initialNotes={session.notes} />
      </div>
    </main>
  );
}
