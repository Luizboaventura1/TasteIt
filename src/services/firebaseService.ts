import { FirebaseAuthErrorMessages } from "@/constants/firebaseErrorMessages";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../lib/firebase/firebase.config";
import FirestoreUserData from "@/interfaces/FirestoreUserData";
import IFirebaseService from "@/interfaces/IFirebaseService";

class FirebaseService implements IFirebaseService {
  private provider = new GoogleAuthProvider();

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, this.provider);
      const user = result.user;

      if (user) {
        const userData: FirestoreUserData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email || "",
          photoURL: user.photoURL || "",
          instagramLink: "",
          favoriteRecipes: [],
        };

        if (!(await this.checkUserExists(user.uid))) {
          await this.createUserInFirestore(user.uid, userData);
        }

        return userData;
      }
    } catch (error: unknown) {
      let errorMessage = "Ocorreu um erro durante o login. Por favor, tente novamente.";

      if (error instanceof FirebaseError) {
        errorMessage =
          FirebaseAuthErrorMessages[error.code as keyof typeof FirebaseAuthErrorMessages] ||
          FirebaseAuthErrorMessages["default"];
      } else if (error instanceof Error) {
        errorMessage = `Erro inesperado: ${error.message}`;
      } else {
        errorMessage = "Erro desconhecido";
      }

      throw new Error(errorMessage);
    }
  }

  async signOut() {
    try {
      await auth.signOut();
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      return "Erro inesperado ao fazer signOut. Por favor, tente novamente.";
    }
  }

  async checkUserExists(userId: string) {
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

  async getUserData() {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      const uid = user.uid;
      const userDocRef = doc(firestore, "users", uid);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data() as FirestoreUserData;
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

  async updateUserData(userData: FirestoreUserData) {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("Usuário não autenticado. Por favor, faça login novamente.");
      }

      const userDocRef = doc(firestore, "users", user.uid);
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

  private async createUserInFirestore(userId: string, userData: FirestoreUserData) {
    try {
      await setDoc(doc(firestore, "users", userId), userData);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return "Erro ao criar usuário no Firestore: " + error.message;
      }

      return "Erro inesperado ao criar um novo usuário";
    }
  }
}

export default FirebaseService;
