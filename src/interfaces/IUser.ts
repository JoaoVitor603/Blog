export interface IUserResponsePayload {
  id: string;
  userName: string;
  admin: boolean;
}

export interface IUser {
  userName?: string;
  email: string;
  password: string;
}
