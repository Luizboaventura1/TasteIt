"use client";

import { AppDispatch, RootState } from "@/store";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import PrimaryButton from "../ui/PrimaryButton";
import DefaultAvatarIcon from "@/components/icons/DefaultAvatarIcon";
import { EventOptionsModal } from "../ui/EventOptionsModal";
import LogoutIcon from "../icons/LogoutIcon";
import UserButtonIcon from "../icons/UserButtonIcon";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { signOut } from "@/store/User/thunks/signOut";
import { loginWithGoogle } from "@/store/User/thunks/loginWithGoogle";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AuthService from "@/services/authService";

export default function AccountUserModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const userData = useSelector(
    (state: RootState) => state.user
  ).user;
  const dispatch = useDispatch<AppDispatch>();

  const login = async () => {
    await dispatch(loginWithGoogle());
  };

  const logout = async () => {
    await dispatch(signOut());
  };

  const goToProfile = () => {
    const userId = new AuthService().getUserId();

    router.push(`/profile/${userId}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  if (!userData) {
    return (
      <PrimaryButton onClick={login} size="sm">
        Login
      </PrimaryButton>
    );
  }

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
      >
        {userData.photoURL ? (
          <Image
            className="w-8 h-8 rounded-full"
            src={userData.photoURL}
            alt="User image"
            width={60}
            height={60}
          />
        ) : (
          <DefaultAvatarIcon size="lg" />
        )}
      </button>
      {isOpen && (
        <div
          ref={wrapperRef}
          className="absolute top-10 right-0"
        >
          <EventOptionsModal.Root>
            <EventOptionsModal.Button
              onClick={goToProfile}
              icon={<UserButtonIcon size="md" />}
              text="Ver perfil"
            />
            <EventOptionsModal.Button
              onClick={async () => {
                await logout();
                setIsOpen(false);
              }}
              icon={<LogoutIcon size="md" />}
              text="Sair da conta"
            />
          </EventOptionsModal.Root>
        </div>
      )}
    </div>
  );
}
