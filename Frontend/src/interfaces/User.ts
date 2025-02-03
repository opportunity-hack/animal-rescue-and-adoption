export interface User {
  authenticated: boolean;
  user: UserDetails;
}

export interface UserResponse {
  authenticated: boolean;
  data: UserDetails | null;
}

export interface UserDetails {
  _id: string;
  picture: string;
  email: string;
  name: string;
  role: Role;
}

interface Role {
  perm_level: number;
  name: string;
}
