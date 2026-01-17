import UserData from "./UserData";

interface IUserService {
  checkUserExists(userId: string): Promise<boolean>;
  getUserDataById(id: string): Promise<UserData>;
  updateUserData(userData: UserData): Promise<void>;
  createUser(userData: UserData): Promise<void>
}

export default IUserService;
