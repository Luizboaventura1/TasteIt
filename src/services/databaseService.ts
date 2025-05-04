import { FirebaseAuthErrorMessages } from "@/constants/firebaseErrorMessages";
import { FirebaseError } from "firebase/app";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase/firebase.config";
import UserData from "@/interfaces/UserData";
import IDatabaseService from "@/interfaces/IDatabaseService";

class DatabaseService implements IDatabaseService {
  async checkUserExists(userId: string): Promise<boolean | Error> {
    try {
      const userDocRef = doc(firestore, "users", userId);
      const userSnapshot = await getDoc(userDocRef);

      return userSnapshot.exists();
    } catch (error: unknown) {
      let errorMessage = "Erro ao verificar se o usuário existe.";

      if (error instanceof FirebaseError) {
        errorMessage =
          FirebaseAuthErrorMessages[error.code as keyof typeof FirebaseAuthErrorMessages] ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return new Error(errorMessage);
    }
  }

  async getUserData(id: string): Promise<UserData | Error> {
    try {
      if (!id) {
        return new Error("id do usuário inválido");
      }

      const userDocRef = doc(firestore, "users", id);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data() as UserData;
        return userData;
      }

      return new Error("Usuário não encontrado");
    } catch (error: Error | unknown) {
      let errorMessage = "Erro inesperado ao obter os dados do usuário.";

      if (error instanceof FirebaseError) {
        errorMessage =
          FirebaseAuthErrorMessages[error.code as keyof typeof FirebaseAuthErrorMessages] ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return new Error(errorMessage);
    }
  }

  async updateUserData(userData: UserData): Promise<void | Error> {
    try {
      const userExistsResult = await this.checkUserExists(userData.id);

      if (userExistsResult instanceof Error) return userExistsResult;
      if (!userExistsResult) return new Error("Id do usuário inválido.");

      const userDocRef = doc(firestore, "users", userData.id);

      await setDoc(userDocRef, userData, { merge: true });
      return;
    } catch (error: unknown) {
      let errorMessage = "Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.";

      if (error instanceof FirebaseError) {
        errorMessage =
          FirebaseAuthErrorMessages[error.code as keyof typeof FirebaseAuthErrorMessages] ||
          "Erro ao atualizar dados do usuário no Firestore.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return new Error(errorMessage);
    }
  }

  async createUser(userData: UserData): Promise<void | Error> {
    try {
      const userExistsResult = await this.checkUserExists(userData.id);

      if (userExistsResult instanceof Error) return userExistsResult;

      if (userExistsResult) return new Error("O usuário já existe.");

      await setDoc(doc(firestore, "users", userData.id), userData);
      return;
    } catch (error: unknown) {
      let errorMessage = "Erro ao criar usuário no Firestore.";

      if (error instanceof FirebaseError) {
        errorMessage =
          FirebaseAuthErrorMessages[error.code as keyof typeof FirebaseAuthErrorMessages] ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return new Error(errorMessage);
    }
  }
}

export default DatabaseService;
