"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth, signOut } from "@/lib/auth";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className={isActive ? "text-gray-300 underline" : "text-white hover:text-gray-500"}>
            {children}
        </Link>
    );
}

export default async function NavBar() {
    const session = await auth();
    const user = session?.user;

    return (
        <nav>
            <ul className="flex gap-4 justify-around items-center">
                <li><NavLink href="/">Home</NavLink></li>
                <li><NavLink href="/dashboard">Dashboard</NavLink></li>
                <li><NavLink href="/sessions">All Sessions</NavLink></li>
                (user && (
                    <li>
                        <button onClick={() => signOut()}>Logout</button>
                    </li>
                ))
                (!user && (
                    <li><NavLink href="/login">Login</NavLink></li>
                ))
            </ul>
        </nav>
    );
}