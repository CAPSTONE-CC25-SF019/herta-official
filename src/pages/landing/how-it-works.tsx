import React from "react";
import Card from "../../components/general/landing/how-it-works/card-step";
import { UserPlusIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const HowItWorks: React.FC = () => {
  const steps: Step[] = [
    {
      id: 1,
      title: "Step 1",
      subtitle: "Register Your Account",
      description:
        "Create your account to access healthcare analytics and predictions.",
      icon: <UserPlusIcon className="size-8" />,
    },
    {
      id: 2,
      title: "Step 2",
      subtitle: "Login to Your Account",
      description:
        "Securely log in to your account to start exploring health data.",
      icon: <ArrowLeftOnRectangleIcon className="size-8" />,
    },
    {
      id: 3,
      title: "Step 3",
      subtitle: "Access Your Dashboard",
      description:
        "Access disease insights, AI health predictions, and analytics tools.",
      icon: <ChartBarIcon className="size-8" />,
    },
  ];

  return (
    <section
      id="how-it-work"
      className="bg-herta-bg relative flex min-h-screen flex-col items-center justify-center p-4 md:p-8"
    >
      <div className="w-full max-w-6xl">
        {/* Title */}
        <div
          className="animate-fadeIn mb-12 text-center opacity-0"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <h2 className="mb-3 text-3xl font-bold text-black md:text-4xl lg:text-5xl">
            How It Work
          </h2>
          <div className="bg-herta-400 mx-auto mb-6 h-1 w-20"></div>
          <p className="text-md mx-auto max-w-2xl text-gray-700 md:text-xl">
            Follow these simple steps to start your healthcare journey with us
          </p>
        </div>

        <div className="relative mb-8 md:mb-12">
          {/* Desktop */}
          <div className="relative mb-8 hidden md:flex md:justify-center md:px-28">
            <div className="flex w-full max-w-md items-center justify-between px-8 md:max-w-[45rem]">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div
                    className="animate-fadeIn border-herta-400 text-herta-500 hover:bg-herta-400 z-10 flex size-8 w-12 items-center justify-center rounded-full border-3 text-lg font-bold opacity-0 transition-all duration-300 hover:scale-110 hover:text-white hover:shadow-lg"
                    style={{
                      animationDelay: `${step.id * 0.15}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    {step.id < 10 ? `0${step.id}` : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="animate-fadeIn bg-herta-400 h-[3px] flex-grow opacity-0 transition-all duration-300 hover:h-[5px]"
                      style={{
                        animationDelay: `${(index + 1) * 0.15}s`,
                        animationFillMode: "forwards",
                      }}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="relative flex justify-center md:hidden">
            <div className="mt-36 flex flex-col items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="border-herta-400 text-herta-500 hover:bg-herta-400 z-10 flex h-10 w-10 items-center justify-center rounded-full border-3 text-base font-bold transition-all duration-300 hover:scale-110 hover:text-white hover:shadow-lg">
                    {step.id < 10 ? `0${step.id}` : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="bg-herta-400 h-75 w-[3px] transition-all duration-300"></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="ml-6 flex flex-col space-y-16">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="animate-fadeIn w-full max-w-56 opacity-0"
                  style={{
                    animationDelay: `${step.id * 0.3}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <Card card={step} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-10">
            {steps.map((step) => (
              <div
                key={step.id}
                className="animate-fadeIn w-full translate-y-4 opacity-0 md:max-w-52 lg:max-w-68"
                style={{
                  animationDelay: `${step.id * 0.3}s`,
                  animationFillMode: "forwards",
                }}
              >
                <Card card={step} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
