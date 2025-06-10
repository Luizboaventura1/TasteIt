import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../ui/PrimaryButton";
import DefaultAvatarIcon from "@/components/icons/DefaultAvatarIcon";
import { EventOptionsModal } from "../ui/EventOptionsModal";
import LogoutIcon from "../icons/LogoutIcon";
import UserButtonIcon from "../icons/UserButtonIcon";
import { useEffect, useRef, useState } from "react";
import { signOut } from "@/store/User/thunks/signOut";
import { loginWithGoogle } from "@/store/User/thunks/loginWithGoogle";

export default function AccountUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const userData = useSelector((state: RootState) => state.user).user;
  const dispatch = useDispatch<AppDispatch>();

  const login = async () => {
    await dispatch(loginWithGoogle());
  };

  const logout = async () => {
    await dispatch(signOut());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!userData) {
    return (
      <PrimaryButton onClick={login} size="sm">
        Login
      </PrimaryButton>
    );
  }

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(true)} className="cursor-pointer">
        <DefaultAvatarIcon size="lg" />
      </button>
      {isOpen && (
        <div ref={wrapperRef} className="absolute top-10 right-0">
          <EventOptionsModal.Root>
            <EventOptionsModal.Button icon={<UserButtonIcon size="md" />} text="Ver perfil" />
            <EventOptionsModal.Button
              onClick={logout}
              icon={<LogoutIcon size="md" />}
              text="Sair da conta"
            />
          </EventOptionsModal.Root>
        </div>
      )}
    </div>
  );
}
