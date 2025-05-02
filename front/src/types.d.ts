export interface IRegisterMutation {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface ILoginMutation {
  username: string;
  password: string;
}

export interface IGlobalError {
  error: string;
}
