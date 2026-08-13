import Link from "next/link";

type Genre = "Games" | "Chatting" | "Music" | "IRL" | "Creative" | "Other";

const genreStyles: Record<Genre, { color: string; label: string }> = {
  Games: { color: "bg-blue-500", label: "Games" },
  Chatting: { color: "bg-teal-500", label: "Chatting" },
  Music: { color: "bg-pink-500", label: "Music" },
  IRL: { color: "bg-orange-500", label: "IRL" },
  Creative: { color: "bg-yellow-500", label: "Creative" },
  Other: { color: "bg-zinc-500", label: "Other" },
};

interface TypeCardProps {
  id: number;
  name: string;
  notes?: string | null;
  status: "Active" | "Retired";
  genres?: Genre[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function TypeCard({
  id,
  name,
  notes,
  status,
  genres = [],
  onEdit,
  onDelete,
  }: TypeCardProps) {
  return (
    <Link href={`/types/${id}`}>
      <div className="bg-white/5 rounded-lg p-4 border border-zinc-700 hover:border-accent transition">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-foreground font-semibold text-lg wrap-break-word">{name}</h3>
          <span
            className={`shrink-0 text-xs px-2 py-1 rounded ${
              status === "Active" ? "bg-black text-foreground" : "bg-black text-white/50"
            }`}
          >
            {status}
          </span>
        </div>

        {notes && (
          <p className="text-foreground text-sm mb-3 line-clamp-2">{notes}</p>
        )}

        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {genres.map((genre) => (
              <span
                key={genre}
                className={`text-xs text-white px-2 py-0.5 rounded ${genreStyles[genre]?.color ?? "bg-zinc-600"}`}
              >
                {genreStyles[genre]?.label ?? genre}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-3">
          {onEdit && (
            <button
              onClick={() => onEdit(id)}
              className="text-sm text-foreground hover:underline"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(id)}
              className="text-sm text-red-400 hover:underline"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}