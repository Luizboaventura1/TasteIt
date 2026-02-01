import { FirebaseAuthErrorMessages } from "../constants/firebaseErrorMessages";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth } from "../lib/firebase/firebase.config";
import IAuthService from "@/interfaces/IAuthService";
import UserService from "./userService";
import UserData from "@/interfaces/UserData";
import Roles from "@/enums/Roles";

class AuthService implements IAuthService {
  private provider = new GoogleAuthProvider();
  private userService = new UserService();

  async loginWithGoogle(): Promise<User> {
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

  async loginAndEnsureUser(): Promise<User> {
    try {
      // 1. Authenticate with Google
      const user = await this.loginWithGoogle();

      // 2. Check if user exists in Firestore
      const userExists = await this.userService.checkUserExists(user.uid);

      // 3. Create user document if it doesn't exist
      if (!userExists) {
        const userData: UserData = {
          id: user.uid,
          email: user.email ?? null,
          name: user.displayName ?? null,
          photoURL: user.photoURL ?? null,
          role: Roles.USER,
          instagramLink: null,
          favoriteRecipes: null,
        };

        await this.userService.createUser(userData);
      }

      return user;
    } catch (error: Error | unknown) {
      let errorMessage = "Erro durante o login e criação do usuário.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }

  async signOut(): Promise<void> {
    try {
      await auth.signOut();
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("Erro inesperado ao fazer signOut. Por favor, tente novamente.");
    }
  }

  getUserId(): string {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não autenticado. Por favor, faça login novamente.");
    }

    return user.uid;
  }

  getCurrentUser(): User {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não autenticado. Por favor, faça login novamente.");
    }

    return user;
  }

  isAuthenticated(): boolean {
    return !!auth.currentUser;
  }

  tryGetUserId(): string | null {
    const user = auth.currentUser;
    return user ? user.uid : null;
  }
}

export default AuthService;
