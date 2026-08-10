"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong.");
      setIsSubmitting(false);
      return;
    }

    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#242428] p-6 sm:p-8 rounded-lg w-full max-w-sm"
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6">
          Create your StreamPlan account
        </h1>

        {error && (
          <p role="alert" className="text-red-400 text-sm mb-4">
            {error}
          </p>
        )}

        <label htmlFor="email" className="block text-sm text-zinc-300 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-[#1a1a1e] text-white border border-zinc-700 focus:border-accent focus:outline-none"
          required
        />

        <label htmlFor="password" className="block text-sm text-zinc-300 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 rounded bg-[#1a1a1e] text-white border border-zinc-700 focus:border-accent focus:outline-none"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-white py-2 rounded font-medium hover:bg-blue-400 transition disabled:opacity-50"
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}