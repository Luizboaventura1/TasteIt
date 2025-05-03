import { FirebaseAuthErrorMessages } from "@/constants/firebaseErrorMessages";
import { FirebaseError } from "firebase/app";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase/firebase.config";
import UserData from "@/interfaces/UserData";
import IDatabaseService from "@/interfaces/IDatabaseService";

class DatabaseService implements IDatabaseService {
  async checkUserExists(userId: string): Promise<boolean | string> {
    try {
      const userDocRef = doc(firestore, "users", userId);
      const userSnapshot = await getDoc(userDocRef);

      return userSnapshot.exists();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return "Erro ao verificar se o usuário existe";
      }

      return "Erro inesperado ao verificar se o usuário existe";
    }
  }

  async getUserData(id: string): Promise<UserData | Error | string> {
    try {
      if (!id) throw new Error("id do usuário inválido");

      const userDocRef = doc(firestore, "users", id);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data() as UserData;
        return userData;
      }

      throw new Error("Usuário não encontrado");
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return error.message;
      }

      return "Erro inesperado ao obter os dados do usuário";
    }
  }

  async updateUserData(userData: UserData): Promise<void | Error | string> {
    try {
      if (!await this.checkUserExists(userData.id)) throw new Error("Id do usuário inválido.");

      const userDocRef = doc(firestore, "users", userData.id);
      await setDoc(userDocRef, userData, { merge: true });

      return "Dados do usuário atualizados com sucesso!";
    } catch (error: unknown) {
      let errorMessage = "Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.";

      if (error instanceof FirebaseError) {
        errorMessage =
          FirebaseAuthErrorMessages[error.code as keyof typeof FirebaseAuthErrorMessages] ||
          "Erro ao atualizar dados do usuário no Firestore.";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }

  async createUser(userData: UserData): Promise<void | string> {
    try {
      if (await this.checkUserExists(userData.id)) throw new Error("O usuário já existe.");

      await setDoc(doc(firestore, "users", userData.id), userData);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return "Erro ao criar usuário no Firestore";
      }

      return "Erro inesperado ao criar um novo usuário";
    }
  }
}

export default DatabaseService;
