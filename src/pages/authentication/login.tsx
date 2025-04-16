import { Link, Navigate } from "react-router-dom";
import InputText from "../../components/ui/input-text";
import Button from "../../components/ui/particles/button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import useLogin from "../../hooks/useLogin";
import { ChangeEventHandler, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ErrorLabel from "../../components/general/forms/error-label";

export default function LoginPage() {
  const { login, email, setEmail, password, setPassword, isLoading, error } = useLogin();
  const context = useContext(AuthContext);
  
  if (context?.token) return <Navigate to="/" />;
  
  return (
    <section className="flex h-svh w-full flex-col items-center justify-center gap-2 p-2">
      <div className="w-full max-w-[400px]">
        <Button
          variant="secondary"
          type="hashlink"
          to="/#home"
          smooth={true}
          className="!flex gap-1 !pr-6 !pl-3"
        >
          <ChevronLeftIcon className="size-5" /> Back
        </Button>
      </div>
      <form
        className="bg-herta-150 w-full max-w-[400px] rounded-lg px-6 py-8 shadow-sm"
        onSubmit={login}
      >
        <header className="mb-2">
          <h1 className="mb-2 text-2xl">Login</h1>
          <p className="text-base text-zinc-500">
            Welcome back! Please enter your login details.
          </p>
        </header>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3">
            <ErrorLabel error={error} />
          </div>
        )}
        
        <div className="space-y-4">
          <div className="space-y-2">
            <InputText
              id="login"
              name="login"
              label="Email"
              placeholder="e.g. user@example.com"
              autoComplete="username"
              value={email as string}
              onChange={setEmail as ChangeEventHandler<HTMLInputElement>}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <InputText
              id="password"
              type="password"
              name="password"
              label="Password"
              placeholder="e.g. password1234"
              autoComplete="password"
              value={password as string}
              onChange={setPassword as ChangeEventHandler<HTMLInputElement>}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="mt-12 flex justify-end">
          <Button 
            variant="primary" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
        <footer className="mt-10">
          <p className="text-center text-base">
            Don{"'"}t have an account?{" "}
            <Link className="text-herta-400 hover:underline" to="/register">
              Create your account
            </Link>
          </p>
        </footer>
      </form>
    </section>
  );
}