"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SessionForm() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [typeId, setTypeId] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [status, setStatus] = useState<"Planned" | "Completed" | "Cancelled">("Planned");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const isEditing = id.trim().length > 0;

    if (!isEditing && !userId.trim()) {
      setError("User ID is required to create a session.");
      return;
    }
    if (!title.trim() || !scheduledDate) {
      setError("Title and scheduled date are required.");
      return;
    }

    setIsSubmitting(true);

    const url = isEditing ? `/api/sessions/${id}` : "/api/sessions";
    const method = isEditing ? "PUT" : "POST";

    const payload = isEditing
      ? { typeId: typeId ? Number(typeId) : null, title, scheduledDate, status, notes }
      : { userId, typeId: typeId ? Number(typeId) : null, title, scheduledDate, notes };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
        setIsSubmitting(false);
        return;
      }

      router.push("/sessions");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#242428] p-6 rounded-lg border border-zinc-700 max-w-md w-full"
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        {id.trim() ? "Edit Session" : "Add New Session"}
      </h2>

      {error && (
        <p role="alert" className="text-red-400 text-sm mb-4">
          {error}
        </p>
      )}

      <label htmlFor="id" className="block text-sm text-zinc-300 mb-1">
        ID <span className="text-zinc-500">(leave blank to create new, fill in to edit)</span>
      </label>
      <input
        id="id"
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#1a1a1e] text-white border border-zinc-700 focus:border-accent focus:outline-none"
      />

      {!id.trim() && (
        <>
          <label htmlFor="userId" className="block text-sm text-zinc-300 mb-1">
            User ID
          </label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-[#1a1a1e] text-white border border-zinc-700 focus:border-accent focus:outline-none"
          />
        </>
      )}

      <label htmlFor="title" className="block text-sm text-zinc-300 mb-1">
        Title
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#1a1a1e] text-white border border-zinc-700 focus:border-accent focus:outline-none"
        required
      />

      <label htmlFor="typeId" className="block text-sm text-zinc-300 mb-1">
        Type ID <span className="text-zinc-500">(optional)</span>
      </label>
      <input
        id="typeId"
        type="text"
        value={typeId}
        onChange={(e) => setTypeId(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#1a1a1e] text-white border border-zinc-700 focus:border-accent focus:outline-none"
      />

      <label htmlFor="scheduledDate" className="block text-sm text-zinc-300 mb-1">
        Scheduled Date
      </label>
      <input
        id="scheduledDate"
        type="datetime-local"
        value={scheduledDate}
        onChange={(e) => setScheduledDate(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-[#1a1a1e] text-white border border-zinc-700 focus:border-accent focus:outline-none"
        required
      />

      {id.trim() && (
        <>
          <label htmlFor="status" className="block text-sm text-zinc-300 mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "Planned" | "Completed" | "Cancelled")}
            className="w-full mb-4 p-2 rounded bg-[#1a1a1e] text-white border border-zinc-700 focus:border-accent focus:outline-none"
          >
            <option value="Planned">Planned</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </>
      )}

      <label htmlFor="notes" className="block text-sm text-zinc-300 mb-1">
        Notes
      </label>
      <textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        className="w-full mb-6 p-2 rounded bg-[#1a1a1e] text-white border border-zinc-700 focus:border-accent focus:outline-none"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-white py-2 rounded font-medium hover:bg-blue-400 transition disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : id.trim() ? "Update Session" : "Create Session"}
      </button>
    </form>
  );
}