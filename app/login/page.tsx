"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputClass = (field: string) =>
    `w-full p-2 rounded bg-[#1a1a1e] text-white border focus:outline-none ${
      fieldErrors[field] ? "border-red-500 focus:border-red-500" : "border-zinc-700 focus:border-accent"
    }`;

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
    if (!password) errors.password = "Password is required.";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setError("Please fix the highlighted fields.");
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-background px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-[#242428] p-6 sm:p-8 rounded-lg w-full max-w-sm"
        noValidate
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6">
          Log in to StreamPlan
        </h1>

        {error && (
          <p role="alert" className="text-red-400 text-sm mb-4">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-zinc-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!fieldErrors.email}
            className={inputClass("email")}
            required
          />
          {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm text-zinc-300 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!fieldErrors.password}
            className={inputClass("password")}
            required
          />
          {fieldErrors.password && <p className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-11 bg-accent text-white py-2 rounded font-medium hover:bg-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
