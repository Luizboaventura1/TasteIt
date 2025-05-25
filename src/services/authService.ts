import { FirebaseAuthErrorMessages } from "../constants/firebaseErrorMessages"
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth } from "../lib/firebase/firebase.config";
import IAuthService from "@/interfaces/IAuthService";

class AuthService implements IAuthService {
  private provider = new GoogleAuthProvider();

  async loginWithGoogle(): Promise<User | Error> {
    try {
      const result = await signInWithPopup(auth, this.provider);
      const user = result.user;

      if (!user) {
        throw new Error("Usuário não autenticado. Por favor, faça login novamente.");
      }

      return user;
    } catch (error: Error | unknown) {
      let errorMessage = "Ocorreu um erro durante o login. Por favor, tente novamente.";

      if (error instanceof FirebaseError) {
        errorMessage =
          FirebaseAuthErrorMessages[error.code as keyof typeof FirebaseAuthErrorMessages] ||
          FirebaseAuthErrorMessages["default"];
      } else if (error instanceof Error) {
        errorMessage = `Erro inesperado: ${error.message}`;
      }

      throw new Error(errorMessage);
    }
  }

  async signOut(): Promise<void | Error> {
    try {
      await auth.signOut();
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("Erro inesperado ao fazer signOut. Por favor, tente novamente.");
    }
  }

  getUserId(): string | Error {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não autenticado. Por favor, faça login novamente.");
    }

    return user.uid;
  }

  getUserData(): User | Error {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não autenticado. Por favor, faça login novamente.");
    }

    return user;
  }
}

export default AuthService;
