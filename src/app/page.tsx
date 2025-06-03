"use client";

import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";

export default function Home() {
  return (
    <main>
      <Container $fullWidth $centered $padding="40px" $background="#f5f5f5">
        <Button>
          Button
        </Button>
      </Container>
    </main>
  );
}
