"use client";

import { useLogin } from "@/hooks/mutations/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../shared/Button";
import { Form } from "./Form";
import { FormContainer } from "./FormContainer";
import { Input } from "./Input";

const schema = z.object({
  email: z.string({ required_error: "Email é obrigatório" }).email({ message: "Insira um email válido." }),
  password: z.string({ required_error: "Senha é obrigatório" })
})

export function LoginForm() {
  const router = useRouter();
  const mutation = useLogin();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (values) => {
    await mutation.mutateAsync(values)
      .then(() => {
        router.push("/dashboard");
      })
  }

  return (
    <FormContainer>
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <Image
          src="/activo_management.svg"
          alt="Activo Managment Logo"
          width={200}
          height={40}
          priority
        />
        <Input
          {...form.register("email")}
          placeholder="Seu email"
          error={form.formState.errors.email?.message}
        />
        <Input
          {...form.register("password")}
          type="password"
          placeholder="Sua senha"
          error={form.formState.errors.password?.message}
        />
        <Button
          type="submit"
          loading={mutation.isPending}
        >
          Entrar
        </Button>
        <p id="register">
          Você ainda não possui um conta? <Link href="/cadastrar-se">Cadatrar-se</Link>
        </p>
      </Form>
    </FormContainer>
  )
}