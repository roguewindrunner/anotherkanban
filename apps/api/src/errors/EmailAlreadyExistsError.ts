import { AppError } from './AppError';

export class EmailAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(`Email '${email}' already exists.`, 409, 'EMAIL_ALREADY_EXISTS');
  }
}
