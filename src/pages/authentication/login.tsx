import { Link } from "react-router-dom";
import InputText from "../../components/ui/particles/input-text";
import Button from "../../components/ui/particles/button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  // TODO: Notify User with Toast for better experience.
  const onLoginHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="flex h-svh w-full flex-col items-center justify-center gap-2 p-2">
      <div className="w-full max-w-[400px]">
        <Button
          variant="secondary"
          type="link"
          to="/"
          className="!flex gap-1 !pr-6 !pl-3"
        >
          <ChevronLeftIcon className="size-5" /> Back
        </Button>
      </div>
      <form
        className="bg-herta-150 w-full max-w-[400px] rounded-lg px-6 py-8 shadow-sm"
        onSubmit={onLoginHandler}
      >
        <header className="mb-10">
          <h1 className="mb-2 text-2xl">login</h1>
          <p className="text-sm text-zinc-500">
            Welcome back! Please enter your login details.
          </p>
        </header>
        <div className="space-y-4">
          <div className="space-y-2">
            <InputText
              id="login"
              name="login"
              label="Username or Email"
              placeholder="e.g. username@example.com"
              autoComplete="username"
            />
            {/* {errors?.username && <ErrorLabel error={errors?.username[0]} />} */}
          </div>
          <div className="space-y-2">
            <InputText
              id="password"
              name="password"
              label="Password"
              placeholder="e.g. password1234"
              autoComplete="password"
            />
            {/* {errors?.password && <ErrorLabel error={errors?.password[0]} />} */}
          </div>
        </div>
        <div className="mt-12 flex justify-end">
          <Button variant="primary" className="w-full">
            Login
          </Button>
        </div>
        <footer className="mt-10">
          <p className="text-center text-sm">
            Don{"'"}t have an a account?{" "}
            <Link className="text-herta-400 hover:underline" to="/register">
              Create your account
            </Link>
          </p>
        </footer>
      </form>
    </section>
  );
}
