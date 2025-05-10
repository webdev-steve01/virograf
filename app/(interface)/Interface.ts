export interface user {
  firstName: string;
  lastName: string;
  email: string;
  uid: string;
}

interface newUserUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface newUser {
  user: newUserUser;
  accessToken: string;
  refreshToken: string;
}
