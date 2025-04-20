import { PencilSquareIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { FloppyDisk } from "@phosphor-icons/react";
import { FormEvent, useContext, useEffect, useState, useRef } from "react";
import Button from "../../components/ui/particles/button";
import useProfileInput from "../../hooks/useProfileInput";
import useCheck from "../../hooks/useCheck";
import { AuthContext } from "../../contexts/AuthContext";
import axiosClient from "../../libs/axios-client";
import useCheckUser from "../../hooks/useCheckUser";

export default function ProfilePage() {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const getAuthenticatedUser = authContext?.getAuthenticatedUser;

  const { isAuthenticated } = useCheckUser();
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
  }, [isAuthenticated]);

  const { username, email, gender, setUsername, setEmail, setGender } =
    useProfileInput({
      usernameDefault: user?.username || "",
      emailDefault: user?.email || "",
      genderDefault: user?.profile?.gender || "",
    });

  const [isUsernameEdit, toggleUsernameEdit] = useCheck();
  const [isEmailEdit, toggleEmailEdit] = useCheck();
  const [isGenderEdit, toggleGenderEdit] = useCheck();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setGender(user.profile?.gender || "");
      hasInitialized.current = true;
    }
  }, [user, setUsername, setEmail, setGender]);

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    setShowPasswordModal(true);
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setPassword("");
  };

  const handleSaveAllChanges = async () => {
    if (isLoading || !password) return;

    try {
      setIsLoading(true);

      const updateData = {
        username,
        gender,
        password,
        image: user?.profile?.image || "",
      };

      await axiosClient.put("/api/v1/users", updateData);

      // Turn off all edit modes
      if (isUsernameEdit) toggleUsernameEdit();
      if (isEmailEdit) toggleEmailEdit();
      if (isGenderEdit) toggleGenderEdit();

      // Close modal
      setShowPasswordModal(false);
      setPassword("");

      getAuthenticatedUser?.();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        type="hashlink"
        to="/#home"
        smooth={true}
        className="absolute top-10 left-10 !flex gap-1 !pr-6 !pl-3"
      >
        <ChevronLeftIcon className="size-5" /> Back
      </Button>
      <form
        onSubmit={handleSubmitForm}
        className="flex h-svh w-full flex-col items-center justify-center gap-10"
      >
        <AvatarProfile username={user?.username || ""} />
        <div className="w-full max-w-[500px] space-y-6 rounded-md bg-white p-8 shadow-sm">
          <FieldDataProfile
            title="Username"
            placeholder="user_1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isEdit={isUsernameEdit}
            setIsEdit={toggleUsernameEdit}
            isLoading={isLoading}
          />
          <FieldDataProfile
            title="Email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isEdit={isEmailEdit}
            setIsEdit={toggleEmailEdit}
            isLoading={isLoading}
          />
          <GenderField
            title="Gender"
            value={gender}
            isEdit={isGenderEdit}
            onChange={handleGenderChange}
            setIsEdit={toggleGenderEdit}
            isLoading={isLoading}
          />

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className={`rounded-md bg-blue-600 px-8 py-2 text-white shadow-sm hover:bg-blue-700 ${
                isLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save All Changes"}
            </button>
          </div>
        </div>
      </form>

      {showPasswordModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Enter your password</h2>
            <p className="mb-4 text-sm text-gray-600">
              Please enter your password to confirm these changes.
            </p>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Password"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAllChanges}
                className={`rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ${
                  isLoading ? "cursor-not-allowed opacity-70" : ""
                }`}
                disabled={isLoading || !password}
              >
                {isLoading ? "Saving..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const AvatarProfile = ({ username }: { username: string }) => {
  return (
    <div className="flex h-40 w-40 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white">
      {username ? username.charAt(0).toUpperCase() : "U"}
    </div>
  );
};

interface FieldDataProfileProps {
  title: string;
  placeholder: string;
  value: string;
  isEdit: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsEdit: () => void;
  isLoading?: boolean;
}

const FieldDataProfile = ({
  title,
  placeholder,
  value,
  isEdit,
  onChange,
  setIsEdit,
  isLoading = false,
}: FieldDataProfileProps) => {
  return (
    <div className="space-y-1">
      <h3 className="font-semibold text-zinc-500">{title}</h3>
      <div className="flex justify-between gap-4">
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full border-zinc-200 p-0 transition-all duration-300 ease-in-out ${
            isEdit && "rounded-md border-[1px] px-4 py-2"
          }`}
          disabled={!isEdit || isLoading}
        />
        <button
          type="button"
          className={`flex cursor-pointer items-center gap-2 text-base ${
            isLoading ? "text-gray-400" : "text-herta-300"
          }`}
          onClick={setIsEdit}
          disabled={isLoading}
        >
          <>
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
          </>
        </button>
      </div>
    </div>
  );
};

interface GenderFieldProps {
  title: string;
  value: string;
  isEdit: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setIsEdit: () => void;
  isLoading?: boolean;
}

const GenderField = ({
  title,
  value,
  isEdit,
  onChange,
  setIsEdit,
  isLoading = false,
}: GenderFieldProps) => {
  return (
    <div className="space-y-1">
      <h3 className="font-semibold text-zinc-500">{title}</h3>
      <div className="flex justify-between gap-4">
        {isEdit ? (
          <select
            value={value}
            onChange={onChange}
            className="w-full rounded-md border-[1px] border-zinc-200 px-4 py-2"
            disabled={isLoading}
          >
            <option value="">Select gender</option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        ) : (
          <div className="w-full p-0">{value || "Not specified"}</div>
        )}
        <button
          type="button"
          className={`flex cursor-pointer items-center gap-2 text-base ${
            isLoading ? "text-gray-400" : "text-herta-300"
          }`}
          onClick={setIsEdit}
          disabled={isLoading}
        >
          <>
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
          </>
        </button>
      </div>
    </div>
  );
};
