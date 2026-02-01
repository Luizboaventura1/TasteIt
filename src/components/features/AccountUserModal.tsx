"use client";
import DefaultAvatarIcon from "@/components/icons/DefaultAvatarIcon";
import AuthService from "@/services/authService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LogoutIcon from "../icons/LogoutIcon";
import UserButtonIcon from "../icons/UserButtonIcon";
import { EventOptionsModal } from "../ui/EventOptionsModal";
import PrimaryButton from "../ui/PrimaryButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "@/constants/queryKeys";

export default function AccountUserModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const authService = new AuthService();
  const queryClient = useQueryClient();

  const goToProfile = () => {
    const userId = authService.tryGetUserId();

    if (!userId) {
      setIsOpen(false);
      return;
    }

    router.push(`/profile/${userId}`);
    setIsOpen(false);
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

  const login = useMutation({
    mutationFn: async () => authService.loginAndEnsureUser(),
  });

  const signOut = useMutation({
    mutationFn: async () => authService.signOut(),
    onSuccess: () => {
      // remove the auth query completely so subscribers get no data
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.AUTH], exact: true });
    },
    onMutate: () => setIsOpen(false),
  });

  const { data: userData } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: async () => authService.getCurrentUser(),
    staleTime: Infinity,
  });

  if (!userData) {
    return (
      <PrimaryButton onClick={() => login.mutate()} size="sm">
        Login
      </PrimaryButton>
    );
  }

  return (
    <div className="relative flex items-center">
      <button onClick={() => setIsOpen(true)} className="cursor-pointer">
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
        <div ref={wrapperRef} className="absolute top-10 right-0">
          <EventOptionsModal.Root>
            <EventOptionsModal.Button
              onClick={goToProfile}
              icon={<UserButtonIcon size="md" />}
              text="Ver perfil"
            />
            <EventOptionsModal.Button
              onClick={() => signOut.mutate()}
              icon={<LogoutIcon size="md" />}
              text="Sair da conta"
            />
          </EventOptionsModal.Root>
        </div>
      )}
    </div>
  );
}
