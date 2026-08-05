import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // TODO: replace with a real lookup once lib/db.ts + the users table exist
        // const user = await getUserByEmail(credentials.email);
        // if (!user) return null;
        // const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        // if (!valid) return null;
        // return { id: user.id, name: user.name, email: user.email };

        // Placeholder so the flow is testable before the DB is wired up:
        if (credentials?.email && credentials?.password) {
          return { id: "1", email: credentials.email as string };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});