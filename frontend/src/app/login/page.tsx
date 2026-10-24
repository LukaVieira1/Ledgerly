"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const { signIn, isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  async function handleLogin(data: LoginData) {
    await signIn(data.email, data.password);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-secondary-900">
              Bem-vindo de volta
            </h2>
            <p className="mt-2 text-sm text-secondary-600">
              Faça login para acessar sua conta
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-secondary-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    {...register("email")}
                    type="email"
                    className="block w-full rounded-lg border border-secondary-300 px-4 py-3 text-secondary-900 placeholder-secondary-500 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-secondary-700"
                >
                  Senha
                </label>
                <div className="mt-1">
                  <input
                    {...register("password")}
                    type="password"
                    className="block w-full rounded-lg border border-secondary-300 px-4 py-3 text-secondary-900 placeholder-secondary-500 focus:border-primary-500 focus:ring-primary-500"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <span className="text-sm text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-secondary-600">
              Desenvolvido por{" "}
              <a
                href="https://lukavieira.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                lukavieira.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800">
          <div className="absolute inset-0 bg-grid-white/[0.2] bg-grid-8" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white space-y-6 max-w-lg">
            <h2 className="text-4xl font-bold">Gerencie suas vendas</h2>
            <p className="text-lg text-secondary-100">
              Controle sobre clientes, vendas e pagamentos em uma única
              plataforma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
