// register.tsx
import { Link, Navigate } from "react-router-dom";
import InputText from "../../components/ui/input-text";
import Button from "../../components/ui/particles/button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import useRegister from "../../hooks/useRegister";
import { ChangeEvent, ChangeEventHandler, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ErrorLabel from "../../components/general/forms/error-label";

export default function RegisterPage() {
  const {
    register,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    age,
    setAge,
    gender,
    setGender,
    isLoading,
    errors,
    generalError
  } = useRegister();
  
  const context = useContext(AuthContext);
  
  // Custom handler for gender selection
  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // Create a synthetic event that mimics an input change event
    const syntheticEvent = {
      target: {
        value: e.target.value
      },
      currentTarget: {
        value: e.target.value
      },
      preventDefault: () => {},
      stopPropagation: () => {}
    } as unknown as ChangeEvent<HTMLInputElement>;
    
    // Pass this synthetic event to setGender
    setGender(syntheticEvent);
  };
  
  // Redirect if already logged in
  if (context?.token) return <Navigate to="/" />;
  
  return (
    <section className="flex h-svh w-full flex-col items-center justify-center gap-2 p-2">
      <div className="w-full max-w-[400px]">
        <Button
          variant="secondary"
          type="hashlink"
          to="/"
          smooth={true}
          className="!flex gap-1 !pr-6 !pl-3"
        >
          <ChevronLeftIcon className="size-5" /> Back
        </Button>
      </div>
      <form
        className="bg-herta-150 w-full max-w-[400px] rounded-lg px-6 py-8 shadow-sm"
        onSubmit={register}
      >
        <header className="mb-6">
          <h1 className="mb-2 text-2xl">Register</h1>
          <p className="text-base text-zinc-500">
            Hi, Welcome! Please enter your register details.
          </p>
        </header>
        
        {generalError && (
          <div className="mb-4 rounded-md bg-red-50 p-3">
            <ErrorLabel error={generalError} />
          </div>
        )}
        
        <div className="space-y-4">
          <div className="space-y-2">
            <InputText
              id="username"
              name="username"
              label="Username"
              placeholder="e.g. username"
              autoComplete="username"
              value={username as string}
              onChange={setUsername as ChangeEventHandler<HTMLInputElement>}
              disabled={isLoading}
            />
            {errors?.username && <ErrorLabel error={errors.username[0]} />}
          </div>
          
          <div className="space-y-2">
            <InputText
              id="email"
              name="email"
              label="Email"
              placeholder="e.g. user@example.com"
              autoComplete="email"
              value={email as string}
              onChange={setEmail as ChangeEventHandler<HTMLInputElement>}
              disabled={isLoading}
            />
            {errors?.email && <ErrorLabel error={errors.email[0]} />}
          </div>
          
          <div className="space-y-2">
            <InputText
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="e.g. password1234"
              autoComplete="new-password"
              value={password as string}
              onChange={setPassword as ChangeEventHandler<HTMLInputElement>}
              disabled={isLoading}
            />
            {errors?.password && <ErrorLabel error={errors.password[0]} />}
          </div>
          
          <div className="space-y-2">
            <InputText
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              label="Password Confirmation"
              placeholder="e.g. password1234"
              autoComplete="new-password"
              value={passwordConfirmation as string}
              onChange={setPasswordConfirmation as ChangeEventHandler<HTMLInputElement>}
              disabled={isLoading}
            />
            {errors?.password_confirmation && <ErrorLabel error={errors.password_confirmation[0]} />}
          </div>
          
          {/* Age field */}
          <div className="space-y-2">
            <InputText
              id="age"
              name="age"
              type="number"
              label="Age"
              placeholder="e.g. 25"
              value={age as string}
              onChange={setAge as ChangeEventHandler<HTMLInputElement>}
              disabled={isLoading}
              min="0"
            />
            {errors?.age && <ErrorLabel error={errors.age[0]} />}
          </div>
          
          {/* Gender field - simplified to just male/female */}
          <div className="space-y-2">
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={gender as string}
              onChange={handleGenderChange}
              disabled={isLoading}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-herta-400 focus:outline-none focus:ring-1 focus:ring-herta-400"
            >
              <option value="">Select gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors?.gender && <ErrorLabel error={errors.gender[0]} />}
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button 
            variant="primary" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </div>
        
        <footer className="mt-6">
          <p className="text-center text-base">
            Already have an account?{" "}
            <Link className="text-herta-400 hover:underline" to="/login">
              Login
            </Link>
          </p>
        </footer>
      </form>
    </section>
  );
}