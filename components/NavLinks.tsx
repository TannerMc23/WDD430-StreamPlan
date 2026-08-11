"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

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

interface NavLinksProps {
  user?: { name?: string | null; email?: string | null } | null;
}

export default function NavLinks({ user }: NavLinksProps) {
  return (
    <nav className="px-4 py-2">
      <ul className="flex flex-wrap gap-x-4 gap-y-2 justify-center sm:justify-around items-center">
        <li><NavLink href="/">Home</NavLink></li>
        <li><NavLink href="/dashboard">Dashboard</NavLink></li>
        <li><NavLink href="/sessions">All Sessions</NavLink></li>
        {user ? (
          <li>
            <button onClick={() => signOut()} className="text-white hover:text-gray-500">
              Logout
            </button>
          </li>
        ) : (
          <li><NavLink href="/login">Login</NavLink></li>
        )}
      </ul>
    </nav>
  );
}