import FirestoreUserData from "./FirestoreUserData";

abstract class IFirebaseService {
  abstract loginWithGoogle(): Promise<FirestoreUserData | Error | unknown>;
  abstract signOut(): Promise<void | Error | unknown>;
  abstract checkUserExists(userId: string): Promise<boolean | string>;
  abstract getUserData(): Promise<FirestoreUserData | Error | unknown>;
  abstract updateUserData(userData: FirestoreUserData): Promise<void | Error | unknown>;
}

export default IFirebaseService;