import { User } from "firebase/auth";

interface IAuthService {
  loginWithGoogle(): Promise<User | Error>;
  signOut(): Promise<void | Error>;
  getUserId(): string | Error;
  getUserData(): User | Error;
}

export default IAuthService;
