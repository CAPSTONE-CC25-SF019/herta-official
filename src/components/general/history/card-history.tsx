import { Link } from "react-router-dom";

interface CardHistoryProps {
  name: string;
  tags: string[];
}

export default function CardHistory({ name, tags }: CardHistoryProps) {
  return (
    <Link
      to={`/`}
      className="rounded-lg border-[1px] border-[#ffffff] bg-[#fcfcfc] p-2 shadow-sm"
    >
      <div className="flex flex-col p-1">
        <div className="mb-2 h-full grow space-y-2">
          <div className="flex flex-col">
            <span className="text-base text-zinc-600">Your Disease:</span>
            <h2 className="line-clamp-2 py-1 text-2xl">{name}</h2>
          </div>
          <div className="flex flex-col">
            <span className="text-base text-zinc-600">Your Indication:</span>
            <div className="mt-2 flex flex-wrap gap-2 max-w-fit">
              {tags.map((tag, index) => (
                <TagHistory key={index} name={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

const TagHistory = ({ name }: { name: string }) => (
  <span className="border-herta-400 text-herta-400 bg-herta-400/20 inline-block min-w-fit rounded-full border-[1px] px-4 py-[.1rem] text-base leading-tight">
    {name}
  </span>
);
