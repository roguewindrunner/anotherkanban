export interface CreateUserResponse {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: Date;
}
