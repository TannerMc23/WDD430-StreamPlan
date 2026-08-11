"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TypeForm() {
    const router = useRouter();
    const [id, setId] = useState("");
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [notes, setNotes] = useState("");
    const [status, setStatus] = useState<"Active" | "Retired">("Active");
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

        if (!name.trim()) {
            setFieldErrors({ name: "Name is required." });
            setError("Please fix the highlighted fields.");
            return;
        }

        setIsSubmitting(true);

        const isEditing = id.trim().length > 0;
        const url = isEditing ? `/api/type/${id}` : "/api/type";
        const method = isEditing ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, name, notes, status }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Something went wrong.");
                setIsSubmitting(false);
                return;
            }

            router.push("/types");
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
                {id.trim() ? "Edit Type" : "Add New Type"}
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
                        className={inputClass("userId")}
                    />
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm text-zinc-300 mb-1">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={!!fieldErrors.name}
                    className={inputClass("name")}
                    required
                />
                {fieldErrors.name && <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
            </div>

            <div className="mb-4">
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

            <div className="mb-6">
                <label htmlFor="status" className="block text-sm text-zinc-300 mb-1">
                    Status
                </label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "Active" | "Retired")}
                    className={inputClass("status")}
                >
                    <option value="Active">Active</option>
                    <option value="Retired">Retired</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-11 bg-accent text-white py-2 rounded font-medium hover:bg-blue-400 transition disabled:opacity-50"
            >
                {isSubmitting ? "Saving..." : id.trim() ? "Update Type" : "Create Type"}
            </button>
        </form>
    );
}
