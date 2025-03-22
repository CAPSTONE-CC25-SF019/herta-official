import Button from '../../components/ui/particles/button';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function Hero() {
    return (
    <section className="relative w-full h-screen overflow-y-auto">
    <div className="h-screen w-full fixed top-0 left-0 z-0 flex flex-col items-center justify-between bg-gradient-to-b from-herta-200 to-herta-400 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-20 -z-2"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-herta-400 opacity-50 -z-2"></div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-white text-8xl sm:text-9xl font-bold">HERTA</h1>
        <p className="text-white text-lg mt-4">Health Prediction & Analytic</p>
        <div className="mt-8 flex space-x-4">
        <Button
          variant="none"
          type="hashlink"
          to="#how-it-work"
          className="border border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-herta-400 transition"
        >
          How It Work
        </Button>
        <Button
          variant="none"
          type="link"
          to="/login"
          className="bg-white text-herta-400 px-6 py-2 rounded-lg hover:opacity-80 transition"
        >
          Login
        </Button>
        </div>
      </div>
      <ChevronDownIcon className="w-10 h-10 text-white mb-8 animate-bounce" />
    </div>
    </section>
    )
}