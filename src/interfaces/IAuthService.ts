import { User } from "firebase/auth";

interface IAuthService {
  loginWithGoogle(): Promise<User | Error | unknown>;
  signOut(): Promise<void | Error | string>;
  getUserId(): string | Error;
  getUserData(): User | Error;
}

export default IAuthService;
