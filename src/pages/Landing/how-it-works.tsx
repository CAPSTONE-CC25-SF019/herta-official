import React from "react";
import Card from "../../components/general/landing/how-it-works/card-step";
import {
  ArrowLeftEndOnRectangleIcon,
  UserPlusIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";

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
      subtitle: "Register",
      description:
        "Create your account to access healthcare analytics and predictions.",
      icon: <UserPlusIcon className="h-12" strokeWidth={0.8} />,
    },
    {
      id: 2,
      title: "Step 2",
      subtitle: "Login",
      description:
        "Securely log in to your account to start exploring health data.",
      icon: <ArrowLeftEndOnRectangleIcon className="h-12" strokeWidth={0.8} />,
    },
    {
      id: 3,
      title: "Step 3",
      subtitle: "Dashboard",
      description:
        "Access disease insights, AI health predictions, and analytics tools.",
      icon: <ChartBarSquareIcon className="h-12" strokeWidth={0.8} />,
    },
  ];

  return (
    <div className="bg-herta-bg flex min-h-screen flex-col items-center justify-center p-7 md:p-8">
      <div className="w-full max-w-6xl">
        <div className="relative mb-8 md:mb-12">
          <div className="relative mb-8 flex justify-center md:px-12">
            <div className="flex w-full max-w-md items-center justify-between md:max-w-xl lg:max-w-[47rem] xl:max-w-[52rem]">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="border-herta-400 text-herta-500 z-10 flex h-10 w-10 items-center justify-center rounded-full border-3 text-base font-bold md:h-12 md:w-12 md:text-lg">
                    {step.id < 10 ? `0${step.id}` : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="bg-herta-400 h-[3px] flex-grow"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-3 md:gap-8">
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
