import { Link } from "react-router-dom";

interface CardDiseaseProps {
  name: string;
  description: string;
  tags: string[];
  image_path: string;
}

export default function CardDisease({
  name,
  description,
  tags,
  image_path,
}: CardDiseaseProps) {
  return (
    <Link
      to={`/`}
      className="rounded-lg border-[1px] border-[#ffffff] bg-[#fcfcfc] p-2 shadow-sm"
    >
      <div className="h-44 w-full overflow-hidden rounded-md bg-zinc-300">
        <img
          src={image_path}
          alt={name}
          className="size-full object-cover object-center text-transparent transition-all duration-300 ease-in-out hover:scale-110"
        />
      </div>
      <div className="flex flex-col p-1">
        <div className="mb-2 h-full grow">
          <h2 className="line-clamp-2 py-1 text-2xl">{name}</h2>
          <p className="line-clamp-2 text-sm text-zinc-600">{description}</p>
        </div>
        <div className="mt-2 flex gap-2">
          {tags.map((tag) => (
            <TagDisease name={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}

const TagDisease = ({ name }: { name: string }) => (
  <span className="border-herta-400 text-herta-400 bg-herta-400/20 inline-block w-fit rounded-full border-[1px] px-4 py-[.1rem] text-sm leading-tight">
    {name}
  </span>
);
