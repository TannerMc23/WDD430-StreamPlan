// Shows upcoming session via api route
// Also shows recent notes on sessions

import SessionCard from "@/components/SessionCard";

export default async function DashboardPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/upcoming`, { cache: "no-store" });
    const sessions = await res.json();

    const notesRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sessions/notes`, { cache: "no-store" });

    return (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Dashboard</h1>
            <p className="mt-2 text-lg text-foreground/70">
                Welcome to your dashboard! Here you can view your upcoming session and recent notes.
            </p>
            <h2 className="text-2xl font-bold text-white">Upcoming Sessions:</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sessions.map((session: any) => (
                    <SessionCard key={session.id} session={session} />
                ))}
            </div>
        </section>
    )
    // add the links to add and edit pages for types and sessions.
}