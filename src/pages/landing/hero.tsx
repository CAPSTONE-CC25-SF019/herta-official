import Button from "../../components/ui/particles/button";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-y-auto">
      <div className="from-herta-200 to-herta-400 fixed top-0 left-0 z-0 flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b">
        <div className="bg-dot-pattern absolute inset-0 -z-2 opacity-20"></div>
        <div className="to-herta-400 absolute inset-0 -z-2 bg-gradient-to-b from-transparent opacity-50"></div>
        <div className="flex flex-grow flex-col items-center justify-center">
          <h1 className="text-8xl font-bold text-white sm:text-9xl">HERTA</h1>
          <p className="mt-4 w-full max-w-102 px-4 text-center text-lg text-white">
            A website to predict and analyze your health easily using machine
            learning models
          </p>
          <div className="mt-8 flex space-x-4">
            <Button
              variant="none"
              type="hashlink"
              to="#how-it-work"
              smooth={true}
              className="hover:text-herta-400 font-semibold rounded-lg border border-white px-6 py-2 text-white transition hover:bg-white"
            >
              How It Work
            </Button>
            <Button
              variant="none"
              type="link"
              to="/login"
              className="text-herta-400 font-semibold rounded-lg bg-white px-6 py-2 transition hover:opacity-80"
            >
              Get Started
            </Button>
          </div>
        </div>
        <ChevronDownIcon className="mb-8 h-10 w-10 animate-bounce text-white" />
      </div>
    </section>
  );
}
