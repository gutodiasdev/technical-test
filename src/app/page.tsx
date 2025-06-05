"use client";

import { Container } from "@/components/shared/Container";
import { LoginForm } from "@/components/shared/LoginForm";

export default function Home() {
  return (
    <main>
      <Container>
        <LoginForm />
      </Container>
    </main>
  );
}
