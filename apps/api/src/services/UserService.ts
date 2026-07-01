import { CreateUserResponse } from '../dto/CreateUserResponse';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import { EmailAlreadyExistsError } from '../errors/EmailAlreadyExistsError';
import { CreateUserRequest } from '../schemas/CreateUserRequestSchema';
import { Argon2PasswordHasher } from '../security/Argon2PasswordHasher';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}
