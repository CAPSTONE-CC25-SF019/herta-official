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
    <div className="h-full min-h-72 w-full max-w-56 bg-white p-4 shadow-[6px_6px_10px_rgba(0,0,0,0.2)] md:min-h-60 md:max-w-48 lg:min-h-80 lg:max-w-64">
      <div className="space-y-3">
        <div className="text-black">{card.icon}</div>
        <span className="text-herta-gray text-sm font-bold">{card.title}</span>
        <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
          {card.subtitle}
        </h1>
        <p className="text-xs text-black md:text-sm lg:text-base">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default Card;
