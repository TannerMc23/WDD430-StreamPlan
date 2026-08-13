import { notFound } from "next/navigation";
import { pool } from "@/lib/db";

interface StreamType {
  id: number;
  name: string;
  notes: string | null;
  status: "Active" | "Retired";
}

async function getType(id: string): Promise<StreamType | null> {
  const { rows } = await pool.query<StreamType>(
    "SELECT * FROM types WHERE id = $1",
    [id]
  );
  return rows[0] ?? null;
}

export default async function TypeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const type = await getType(id);
  if (!type) notFound();

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white/5 rounded-lg p-4 sm:p-6 border border-zinc-700">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground wrap-break-word">
            {type.name}
          </h1>
          <span className={`shrink-0 text-xs px-2 py-1 rounded ${type.status === "Active" ? "bg-black text-foreground" : "bg-black text-white/50"}`}>
            {type.status}
          </span>
        </div>
        {type.notes && <p className="text-foreground text-sm">{type.notes}</p>}
      </div>
    </div>
  );
}