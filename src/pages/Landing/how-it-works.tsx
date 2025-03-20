import React from "react";
import Card from "../../components/general/landing/how-it-works/card-step";
import { UserPlusIcon, ChartBarIcon } from "@heroicons/react/24/outline";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
}

const LoginIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 29 24"
      strokeWidth={0.8}
      stroke="currentColor"
      className="h-12"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 9V5.25A5 5 0 0 0 17 2.5h-10A3 3 0 0 0 4 5.5v13A3 3 0 0 0 7 21.5h10a3 3 0 0 0 3-3V15M14 8l-6 4m0 0 6 4m-6-4h19"
      />
    </svg>
  );
};

const HowItWorks: React.FC = () => {
  const steps: Step[] = [
    {
      id: 1,
      title: "Step 1",
      subtitle: "Register Your Account",
      description:
        "Create your account to access healthcare analytics and predictions.",
      icon: <UserPlusIcon className="h-12" strokeWidth={0.8} />,
    },
    {
      id: 2,
      title: "Step 2",
      subtitle: "Login to Your Account",
      description:
        "Securely log in to your account to start exploring health data.",
      icon: <LoginIcon />,
    },
    {
      id: 3,
      title: "Step 3",
      subtitle: "Access Your Dashboard",
      description:
        "Access disease insights, AI health predictions, and analytics tools.",
      icon: <ChartBarIcon className="h-12" strokeWidth={0.8} />,
    },
  ];

  return (
    <div className="bg-herta-bg flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        <div className="relative mb-8 md:mb-12">
          <div className="relative mb-8 hidden md:flex md:justify-center md:px-12">
            <div className="flex w-full max-w-md items-center justify-between px-8 md:max-w-[45rem]">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="border-herta-400 text-herta-500 z-10 flex h-12 w-12 items-center justify-center rounded-full border-3 text-lg font-bold">
                    {step.id < 10 ? `0${step.id}` : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="bg-herta-400 h-[3px] flex-grow"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="relative md:hidden">
            <div className="absolute left-5 mt-36 flex flex-col items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="border-herta-400 text-herta-500 z-10 flex h-10 w-10 items-center justify-center rounded-full border-3 text-base font-bold">
                    {step.id < 10 ? `0${step.id}` : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="bg-herta-400 h-80 w-[3px]"></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="ml-24 flex flex-col">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`mb-${index < steps.length - 1 ? "24" : "0"} mt-5`}
                >
                  <Card card={step} />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-12">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col">
                <Card card={step} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
