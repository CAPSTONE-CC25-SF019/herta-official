import React from "react";

interface CardProps {
  card: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
  };
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="group h-full min-h-72 bg-white p-6 shadow-sm transition-all duration-300 hover:translate-y-1 hover:shadow-md md:min-h-60 lg:min-h-80">
      <div className="space-y-4 pb-12">
        <div className="text-black transition-transform duration-500 ease-in-out group-hover:scale-105">
          {card.icon}
        </div>
        <span className="text-herta-gray group-hover:text-herta-500 text-base text-sm font-semibold transition-colors duration-300">
          {card.title}
        </span>
        <h1 className="group-hover:text-herta-400 text-lg font-bold transition-colors duration-300">
          {card.subtitle}
        </h1>
        <p className="text-sm text-black text-zinc-500 transition-opacity duration-300 group-hover:opacity-90 md:text-base">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default Card;
