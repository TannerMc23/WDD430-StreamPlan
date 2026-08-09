import { auth } from "@/lib/auth";
import NavLinks from "./NavLinks";

export default async function NavBar() {
  const session = await auth();
  const user = session?.user;

  return <NavLinks user={user} />;
}