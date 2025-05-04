import UserData from "./UserData";

interface IDatabaseService {
  checkUserExists(userId: string): Promise<boolean | Error>;
  getUserData(id: string): Promise<UserData | Error>;
  updateUserData(userData: UserData): Promise<void | Error>;
  createUser(userData: UserData): Promise<void | Error>
}

export default IDatabaseService;
