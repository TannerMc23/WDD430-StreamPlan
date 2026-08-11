import Link from "next/link";
import { SessionRow } from "@/lib/db";

export default function SessionCard({ session }: { session: SessionRow }) {
  const date = new Date(session.scheduled_date).toLocaleString();

  return (
    <Link
      href={`/sessions/${session.id}`}
      className="block rounded-lg border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold wrap-break-word">{session.title}</h3>
        <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-xs uppercase">
          {session.status}
        </span>
      </div>
      <p className="mt-1 text-sm text-foreground/70">{date}</p>
      {session.notes && (
        <p className="mt-2 text-sm text-foreground/80 line-clamp-2">{session.notes}</p>
      )}
    </Link>
  );
}
