import { IBase } from '../base';

export interface IUser extends IBase {
  email: string;
  role: string;
  password?: string;
}
