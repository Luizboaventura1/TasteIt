import StoreUser from "./StoreUser";

export type UserState = {
  user: StoreUser | null;
  loading: boolean;
  error: string | null;
};

export default UserState;
