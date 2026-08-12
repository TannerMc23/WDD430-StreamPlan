import TypeCard from "@/components/TypeCard";
import { pool } from "@/lib/db";
import Link from "next/link";

interface StreamType {
  id: number;
  name: string;
  notes: string | null;
  status: "Active" | "Retired";
}

async function getTypes(): Promise<StreamType[]> {
  const { rows } = await pool.query<StreamType>(
    "SELECT * FROM types ORDER BY id DESC"
  );
  return rows;
}

export default async function TypesPage() {
  const types = await getTypes();

  return (
    <div className="min-h-screen bg-background px-4 py-6 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
          Your Types
        </h1>

        <Link href="/types/add-edit" className="text-accent hover:underline text-sm">
          + Add New Type
        </Link>

        {types.length === 0 ? (
          <div className="mt-4 text-center py-12 px-4 border border-dashed border-zinc-700 rounded-lg">
            <p className="text-zinc-400 text-sm sm:text-base">
              No types yet. Add your first game, chatting session, or other content type to get started.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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