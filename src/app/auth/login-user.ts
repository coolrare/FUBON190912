export interface LoginUser {
  user: User;
}

interface User {
  username: string;
  token: string;
  email: string;
  bio: string;
  image?: any;
}

export interface LoginFail {
  body: string[];
}
