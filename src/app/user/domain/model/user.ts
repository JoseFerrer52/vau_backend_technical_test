export interface DataInputForUser {
  userId: number;
  userName: string;
  email: string;
  password: string;
}

export interface DataInputForDeleteUser {
  userId: number;
  password: string;
}
