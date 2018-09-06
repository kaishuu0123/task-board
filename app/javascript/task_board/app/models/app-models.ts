export interface LoginUser {
  email: string;
  password: string;
}

export interface Project {
  id: Number;
  name: string;
  description: string;
}

export interface Task {
  id: Number;
  projectId: Number;
  title: string;
  description: string;
  status: string;
  row_order: number;
}

export interface RegistrationInfo {
  email: string;
  password: string;
  passwordConfirmation: string;
}