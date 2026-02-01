import { User } from "firebase/auth";

interface IAuthService {
  loginWithGoogle(): Promise<User>;
  loginAndEnsureUser(): Promise<User>;
  signOut(): Promise<void>;
  getUserId(): string;
  getCurrentUser(): User;
  isAuthenticated(): boolean;
  tryGetUserId(): string | null;
}

export default IAuthService;
