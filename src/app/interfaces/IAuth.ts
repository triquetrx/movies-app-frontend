export interface ILogin {
  email?: string;
  loginId?: string;
  password?: string;
}

export interface ISignup extends ILogin {
  firstName?: string;
  lastName?: string;
  gender?: string;
  contactNumber?: string;
  confirmPassword?: string;
}

export interface IUser extends ISignup {
  role?: string;
}

export interface IResetPasswordData {
  password?: string;
  confirmPassword?: string;
}
