"use client";

import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { useAuth } from "@/contexts/AuthContext";

export default function Page() {
  const { logout } = useAuth();

  return (
    <Container>
      <Button onClick={logout}>
        Logout
      </Button>
      <p>Dashboard</p>
    </Container>
  )
}