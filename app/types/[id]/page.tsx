import { notFound } from "next/navigation";

interface StreamType {
  id: number;
  name: string;
  notes: string | null;
  status: "Active" | "Retired";
}

async function getType(id: string): Promise<StreamType | null> {
  const res = await fetch(`http://localhost:3000/api/type/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function TypeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const type = await getType(id);
  if (!type) notFound();

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:p-8">
      <div className="max-w-2xl mx-auto bg-[#242428] rounded-lg p-4 sm:p-6 border border-zinc-700">
        <div className="flex items-center justify-between mb-4 gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold text-white wrap-break-word">
            {type.name}
          </h1>
          <span className={`shrink-0 text-xs px-2 py-1 rounded ${type.status === "Active" ? "bg-accent text-white" : "bg-zinc-600 text-zinc-300"}`}>
            {type.status}
          </span>
        </div>
        {type.notes && <p className="text-zinc-400 text-sm">{type.notes}</p>}
      </div>
    </div>
  );
}