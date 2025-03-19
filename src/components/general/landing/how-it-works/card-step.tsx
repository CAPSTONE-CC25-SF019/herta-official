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
    <div className="h-full w-full rounded-lg bg-white p-6 shadow-md">
      <div className="space-y-3">
        <div className="text-black">{card.icon}</div>
        <span className="text-herta-gray font-bold text-sm">{card.title}</span>
        <h1 className="text-2xl font-bold">{card.subtitle}</h1>
        <p className="text-md text-black">{card.description}</p>
      </div>
    </div>
  );
};

export default Card;
