import UserData from "./UserData";

interface IDatabaseService {
  checkUserExists(userId: string): Promise<boolean | string>;
  getUserData(id: string): Promise<UserData | Error | string>;
  updateUserData(userData: UserData): Promise<void | Error | string>;
  createUser(userData: UserData): Promise<void | string>
}

export default IDatabaseService;
