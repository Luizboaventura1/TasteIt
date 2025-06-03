import UserData from "./UserData";

interface IDatabaseService {
  checkUserExists(userId: string): Promise<boolean>;
  getUserData(id: string): Promise<UserData>;
  updateUserData(userData: UserData): Promise<void>;
  createUser(userData: UserData): Promise<void>
}

export default IDatabaseService;
