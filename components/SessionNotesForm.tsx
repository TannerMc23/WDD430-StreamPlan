"use client";
import { useState } from "react";

type SaveState = "idle" | "saving" | "saved" | "error";

export default function SessionNotesForm({
  sessionId,
  initialNotes,
}: {
  sessionId: number;
  initialNotes: string | null;
}) {
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [state, setState] = useState<SaveState>("idle");

  async function handleSave() {
    setState("saving");
    try {
      const res = await fetch(`/api/sessions/${sessionId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });

      if (!res.ok) throw new Error("Failed to save notes");
      setState("saved");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="mt-4">
      <label htmlFor="session-notes" className="mb-1 block text-sm font-medium text-foreground/80">
        Post-session notes
      </label>
      <textarea
        id="session-notes"
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          setState("idle");
        }}
        rows={5}
        placeholder="What worked, what didn't, ideas for next time..."
        className="w-full resize-y rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent"
      />
      <div className="mt-2 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={state === "saving"}
          className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50"
        >
          {state === "saving" ? "Saving..." : "Save notes"}
        </button>
        {state === "saved" && <span className="text-sm text-foreground/60">Saved</span>}
        {state === "error" && <span className="text-sm text-red-400">Couldn&apos;t save notes. Try again.</span>}
      </div>
    </div>
  );
}
