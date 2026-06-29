import bcrypt from 'bcryptjs';
import { CreateUserRequest } from '../dto/CreateUserRequest';
import { CreateUserResponse } from '../dto/CreateUserResponse';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import { EmailAlreadyExistsError } from '../errors/EmailAlreadyExistsError';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(request: CreateUserRequest): Promise<CreateUserResponse> {
    const existingUser = await this.userRepository.findByEmail(request.email);

    if (existingUser) {
      throw new EmailAlreadyExistsError(request.email);
    }

    const passwordHash = await bcrypt.hash(request.password, 12);

    const user = new User(request.email, passwordHash, request.name);

    const savedUser = await this.userRepository.save(user);

    return {
      id: savedUser.id,
      email: savedUser.email,
      name: savedUser.name,
      avatarUrl: savedUser.avatarUrl,
      createdAt: savedUser.createdAt,
    };
  }
}
