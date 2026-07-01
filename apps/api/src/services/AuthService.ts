import { CreateUserResponse } from '../dto/CreateUserResponse';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import { EmailAlreadyExistsError } from '../errors/EmailAlreadyExistsError';
import { CreateUserRequest } from '../schemas/CreateUserRequestSchema';
import { Argon2PasswordHasher } from '../security/Argon2PasswordHasher';

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: Argon2PasswordHasher,
  ) {}

  async register(request: CreateUserRequest): Promise<CreateUserResponse> {
    const existingUser = await this.userRepository.findByEmail(request.email);

    if (existingUser) {
      throw new EmailAlreadyExistsError(request.email);
    }

    const passwordHash = await this.passwordHasher.hash(request.password);

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
