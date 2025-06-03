import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeUserState } from "@/store/User/userReducer";
import { auth } from "@/lib/firebase/firebase.config";
import DatabaseService from "@/services/databaseService";
import type { AppDispatch } from "@/store";

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      try {
        const databaseService = new DatabaseService();
        const userData = await databaseService.getUserData(user.uid);
        dispatch(initializeUserState(userData));
      } catch (error) {
        console.error(
          "Erro ao carregar dados do usuário:",
          error instanceof Error ? error.message : "Erro desconhecido"
        );
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
}
