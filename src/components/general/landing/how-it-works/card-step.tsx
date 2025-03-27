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
    <div className="h-full min-h-72 bg-white p-4 shadow-[6px_6px_10px_rgba(0,0,0,0.2)] md:min-h-60 lg:min-h-80 transition-all duration-300 hover:shadow-[8px_8px_15px_rgba(0,0,0,0.3)] hover:translate-y-1 group">
      <div className="space-y-3 pb-12">
        <div className="text-black transition-transform duration-500 ease-in-out group-hover:scale-110">{card.icon}</div>
        <span className="text-herta-gray text-base font-bold transition-colors duration-300 group-hover:text-herta-500">{card.title}</span>
        <h1 className="text-lg font-bold md:text-xl lg:text-2xl transition-colors duration-300 group-hover:text-herta-400">
          {card.subtitle}
        </h1>
        <p className="text-xs text-black md:text-base lg:text-lg transition-opacity duration-300 group-hover:opacity-90">
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default Card;
