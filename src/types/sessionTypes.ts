export interface User {
  phone: string;
  user_id: string;
  is_host: boolean;
  is_new_user: boolean;
}

export interface Session {
  user: User;
  expires: string; 
  accessToken: string;
}
