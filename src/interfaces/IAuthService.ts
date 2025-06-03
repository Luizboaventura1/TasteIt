import { User } from "firebase/auth";

interface IAuthService {
  loginWithGoogle(): Promise<User>;
  signOut(): Promise<void>;
  getUserId(): string;
  getCurrentUser(): User;
}

export default IAuthService;
