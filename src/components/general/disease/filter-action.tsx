import { FunnelIcon } from "@heroicons/react/24/outline";

export default function FilterAction() {
  return (
    <div className="flex gap-2">
      <button className="box-border rounded-md border-[1px] border-white bg-[#fafafa] px-2.5 py-2 shadow-sm">
        <FunnelIcon className="size-6" />
      </button>
      <form>
        <input
          type="text"
          className="rounded-md border-[1px] border-white bg-[#fafafa] px-4 py-3 text-base shadow-sm"
          placeholder="Search disease's name"
        />
      </form>
    </div>
  );
}
