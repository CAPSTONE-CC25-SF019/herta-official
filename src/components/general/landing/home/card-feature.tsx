import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import GradientRadial from "../../../ui/particles/gradient-radial";
import { Link } from "react-router-dom";

interface CardFeatureProps {
  title: string;
  description: string;
  callToActionText: string;
  callToActionLink: string;
  className?: string;
}

export default function CardFeature({
  title,
  description,
  callToActionText,
  callToActionLink,
  className = "",
}: CardFeatureProps) {
  return (
    <div
      className={`bg-herta-150 relative w-full overflow-hidden rounded-md p-4 shadow-sm xl:block ${className}`}
    >
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-herta-500 text-lg">{title}</h2>
        <div className="bg-herta-300/20 border-herta-300 text-herta-300 size-8 rounded-full border-[1px] p-1">
          <CheckBadgeIcon className="size-full" />
        </div>
        <GradientRadial className="absolute -top-20 -right-16 m-auto !size-60 opacity-60" />
      </header>
      <p className="text-herta-500/80 mb-8 w-64 text-sm">{description}</p>
      <Link
        rel="stylesheet"
        to={callToActionLink}
        className="bg-herta-300/10 text-herta-300 inline-block h-fit w-fit cursor-pointer rounded-md px-4 py-2 text-sm"
      >
        {callToActionText}
      </Link>
    </div>
  );
}
