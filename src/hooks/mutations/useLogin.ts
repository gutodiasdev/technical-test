"use client";

import { setCookiesSession } from "@/data/actions/auth";
import { apiService } from "@/services/ApiService";
import { tokenService } from "@/services/TokenService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface LoginInput {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  department: string;
  phone: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const loginUser = async (input: LoginInput): Promise<void> => {
  const response = await apiService.request<User[]>({
    path: "/users",
    queryParams: {
      email: input.email
    }
  });
  if (!response) throw new Error("Usuário ou senha inválidos");
  const user = response[0];
  const token = await tokenService.signToken({ id: user.id, email: user.email, name: user.name });
  localStorage.setItem("token", token);
  await setCookiesSession(token);
}

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("Logado com sucesso!");
    },
    onError: (error) => {
      toast.error("Ocorreu um erro durante o processo de login. Fale com um administrador.");
    }
  })
}