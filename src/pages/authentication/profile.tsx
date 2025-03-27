import { PencilSquareIcon } from "@heroicons/react/24/outline";
import useProfileInput from "../../hooks/useProfileInput";
import { ChangeEvent, ChangeEventHandler, MouseEventHandler } from "react";
import { FloppyDisk } from "@phosphor-icons/react";
import useCheck from "../../hooks/useCheck";

export default function ProfilePage() {
  const {
    username,
    email,
    phoneNumber,
    setUsername,
    setEmail,
    setPhoneNumber,
  } = useProfileInput({});

  const [isUsernameEdit, setIsUsernameEdit] = useCheck();
  const [isEmailEdit, setIsEmailEdit] = useCheck();
  const [isPhoneNumberEdit, setIsPhoneNumberEdit] = useCheck();

  return (
    <section className="flex h-svh w-full flex-col items-center justify-center gap-10">
      <ImageProfile src="/" username={""} />
      <div className="w-full max-w-[500px] space-y-6 rounded-md bg-white p-8 shadow-sm">
        <FieldDataProfile
          title="Username"
          placeholder="user_1"
          value={username}
          onChange={setUsername}
          isEdit={isUsernameEdit}
          setIsEdit={setIsUsernameEdit}
        />
        <FieldDataProfile
          title="Email"
          placeholder="user@example.com"
          value={email}
          onChange={setEmail}
          isEdit={isEmailEdit}
          setIsEdit={setIsEmailEdit}
        />
        <FieldDataProfile
          title="Phone Number"
          placeholder="+62821-8820-3992"
          value={phoneNumber}
          onChange={setPhoneNumber}
          isEdit={isPhoneNumberEdit}
          setIsEdit={setIsPhoneNumberEdit}
        />
      </div>
    </section>
  );
}

const ImageProfile = ({
  src = "/",
  username,
}: {
  src: string;
  username: string;
}) => {
  return (
    <div className="size-40 overflow-hidden rounded-full bg-zinc-300">
      <img
        src={src}
        alt={username}
        className="size-full object-cover object-center text-transparent"
      />
    </div>
  );
};

const FieldDataProfile = ({
  title,
  placeholder,
  value,
  isEdit,
  onChange,
  setIsEdit,
}: {
  title: string;
  placeholder: string;
  value: string | ((e: ChangeEvent<HTMLInputElement>) => void);
  isEdit: boolean | ((e: ChangeEvent<HTMLInputElement>) => void);
  onChange: string | ((e: ChangeEvent<HTMLInputElement>) => void);
  setIsEdit: boolean | (() => void);
}) => {
  return (
    <div className="space-y-1">
      <h3 className="font-semibold text-zinc-500">{title}</h3>
      <div className="flex justify-between gap-4">
        <input
          placeholder={placeholder}
          value={value as string}
          onChange={
            onChange as ChangeEventHandler<HTMLInputElement> | undefined
          }
          className={`w-full border-zinc-200 p-0 transition-all duration-300 ease-in-out ${isEdit && "rounded-md border-[1px] px-4 py-2"}`}
          disabled={!isEdit}
        />
        <button
          className="text-herta-300 flex cursor-pointer items-center gap-2 text-base"
          onClick={
            setIsEdit as MouseEventHandler<HTMLButtonElement> | undefined
          }
        >
          {isEdit ? (
            <>
              <span className="leading-tight tracking-tight">Save</span>
              <FloppyDisk className="size-5" />
            </>
          ) : (
            <>
              <span className="leading-tight tracking-tight">Edit</span>
              <PencilSquareIcon className="size-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
