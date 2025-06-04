import { AuthProvider } from "@/contexts/AuthContext";
import { getSession } from "@/data/actions/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/");

  return (
    <AuthProvider session={session}>
      {children}
    </AuthProvider>
  )
}