import CardDisease from "../../components/general/disease/card-disease";
import DisplaySwitch from "../../components/general/disease/display-switch";
import FilterAction from "../../components/general/disease/filter-action";

export default function DiseasePage() {
  return (
    <section className="mx-auto w-full max-w-[1200px] p-4">
      <header className="mb-2 flex h-fit items-center justify-between">
        <DisplaySwitch />
        <FilterAction />
      </header>
      <div className="grid w-full grid-cols-2 gap-2 xl:grid-cols-3">
        <CardDisease
          name="Title"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis animi,
          in distinctio fugiat quas sequi voluptatibus assumenda eius expedita
          quis harum impedit eligendi aperiam? Sed veniam"
          tags={["Stroke", "Fever"]}
          image_path="/"
        />
        <CardDisease
          name="Title"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis animi,
          in distinctio fugiat quas sequi voluptatibus assumenda eius expedita
          quis harum impedit eligendi aperiam? Sed veniam"
          tags={["Stroke", "Fever"]}
          image_path="/"
        />
        <CardDisease
          name="Title"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis animi,
          in distinctio fugiat quas sequi voluptatibus assumenda eius expedita
          quis harum impedit eligendi aperiam? Sed veniam"
          tags={["Stroke", "Fever"]}
          image_path="/"
        />
      </div>
    </section>
  );
}
