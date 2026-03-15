export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Document {
  id: string;
  userId: string;
  userName: string;
  fileName: string;
  fileSize: number;
  hash: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
