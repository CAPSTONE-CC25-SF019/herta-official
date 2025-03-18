import {
  RectangleStackIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export default function DisplaySwitch() {
  return (
    <ul className="flex gap-1 rounded-md border-[1px] border-white bg-[#fafafa] p-1 shadow-sm">
      <li className="relative">
        <button className="size-10 p-2">
          <Squares2X2Icon className="size-full text-sky-400" />
        </button>
        <div className="absolute top-0 left-0 size-full rounded-md bg-sky-400/20" />
      </li>
      <li className="relative">
        <button className="size-10 p-2">
          <RectangleStackIcon className="size-full" />
        </button>
        <div className="absolute top-0 left-0" />
      </li>
    </ul>
  );
}
