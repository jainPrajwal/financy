export type UserLoginCredentials = {
    email: string | null;
    password: string | null;
  };
  
  export type signupUserCredentials = {
    name: string | null;
    email: string | null;
    password: string | null;
    gender: string | null;
    dateOfBirth: Date;
  };
  
  export type AuthState = {
    loggedInUser: string | null;
    token: string | null;
  };
  