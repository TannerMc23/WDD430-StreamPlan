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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputClass = (field: string) =>
    `w-full p-2 rounded bg-[#1a1a1e] text-white border focus:outline-none ${
      fieldErrors[field] ? "border-red-500 focus:border-red-500" : "border-zinc-700 focus:border-accent"
    }`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const isEditing = id.trim().length > 0;
    const nextFieldErrors: Record<string, string> = {};

    if (!isEditing && !userId.trim()) {
      nextFieldErrors.userId = "User ID is required to create a session.";
    }
    if (!title.trim()) {
      nextFieldErrors.title = "Title is required.";
    }
    if (!scheduledDate) {
      nextFieldErrors.scheduledDate = "Scheduled date is required.";
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      setError("Please fix the highlighted fields.");
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

      <div className="mb-4">
        <label htmlFor="id" className="block text-sm text-zinc-300 mb-1">
          ID <span className="text-zinc-500">(leave blank to create new, fill in to edit)</span>
        </label>
        <input
          id="id"
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className={inputClass("id")}
        />
      </div>

      {!id.trim() && (
        <div className="mb-4">
          <label htmlFor="userId" className="block text-sm text-zinc-300 mb-1">
            User ID
          </label>
          <input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            aria-invalid={!!fieldErrors.userId}
            className={inputClass("userId")}
          />
          {fieldErrors.userId && <p className="text-red-400 text-xs mt-1">{fieldErrors.userId}</p>}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm text-zinc-300 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!fieldErrors.title}
          className={inputClass("title")}
          required
        />
        {fieldErrors.title && <p className="text-red-400 text-xs mt-1">{fieldErrors.title}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="typeId" className="block text-sm text-zinc-300 mb-1">
          Type ID <span className="text-zinc-500">(optional)</span>
        </label>
        <input
          id="typeId"
          type="text"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          className={inputClass("typeId")}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="scheduledDate" className="block text-sm text-zinc-300 mb-1">
          Scheduled Date
        </label>
        <input
          id="scheduledDate"
          type="datetime-local"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
          aria-invalid={!!fieldErrors.scheduledDate}
          className={inputClass("scheduledDate")}
          required
        />
        {fieldErrors.scheduledDate && (
          <p className="text-red-400 text-xs mt-1">{fieldErrors.scheduledDate}</p>
        )}
      </div>

      {id.trim() && (
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm text-zinc-300 mb-1">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "Planned" | "Completed" | "Cancelled")}
            className={inputClass("status")}
          >
            <option value="Planned">Planned</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="notes" className="block text-sm text-zinc-300 mb-1">
          Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className={inputClass("notes")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full min-h-11 bg-accent text-white py-2 rounded font-medium hover:bg-blue-400 transition disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : id.trim() ? "Update Session" : "Create Session"}
      </button>
    </form>
  );
}
