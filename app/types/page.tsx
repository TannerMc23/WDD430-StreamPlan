import TypeCard from "@/components/TypeCard";

interface StreamType {
  id: number;
  name: string;
  notes: string | null;
  status: "Active" | "Retired";
}

async function getTypes(): Promise<StreamType[]> {
  const res = await fetch("http://localhost:3000/api/type", {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function TypesPage() {
  const types = await getTypes();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-6">Your Types</h1>

        {types.length === 0 ? (
          <p className="text-zinc-400">
            No types yet. Add your first game, chatting session, or other content type to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {types.map((type) => (
              <TypeCard
                key={type.id}
                id={type.id}
                name={type.name}
                notes={type.notes}
                status={type.status}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}