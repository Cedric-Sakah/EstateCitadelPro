import { UserInput, UserDocument } from '../models/User';
import { IUserRepository } from '../repositories/userRepository';
import { validateUser } from '../validations/users';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async register(userData: UserInput): Promise<UserDocument> {
    const { error } = validateUser(userData);
    if (error) throw new Error(`Validation error: ${error.details[0].message}`);

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) throw new Error('User already exists with this email');

    return this.userRepository.create(userData);
  }

  async getUsers(): Promise<UserDocument[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<UserDocument | null> {
    return this.userRepository.findById(id);
  }

  async updateUser(id: string, userData: Partial<UserInput>): Promise<UserDocument | null> {
    return this.userRepository.update(id, userData);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}