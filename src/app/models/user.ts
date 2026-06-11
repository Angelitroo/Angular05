export interface User {
  id?: string;
  email: string;
  fotoUrl: string;
  firstname: string;
  lastname: string;
  role: 'user' | 'admin';
  createdAt: Date;
}
