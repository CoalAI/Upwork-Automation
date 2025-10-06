import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, LogIn } from "lucide-react";

const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(100),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const token = await apiClient.login(values.username, values.password);
      localStorage.setItem("token", token);
      toast({
        title: "Signed in",
        description: "Welcome back! Redirecting…",
      });
      onLogin(token);
    } catch (err: any) {
      toast({
        title: "Login failed",
        description:
          err?.message || "Invalid credentials. Please check and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100">
      <Card className="w-full max-w-sm shadow-xl border-emerald-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 h-11 w-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Lock className="h-6 w-6" />
          </div>
          <CardTitle className="text-3xl font-extrabold text-emerald-700 tracking-tight">
            Login
          </CardTitle>
          <CardDescription className="text-emerald-700/70">
            Secure access to Up Sales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="e.g. hamna"
                autoComplete="username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </>
              )}
            </Button>

            <p className="text-xs text-center text-emerald-800/60">
              Protected area • Authorized users only
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
