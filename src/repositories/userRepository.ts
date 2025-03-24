import { User, UserDocument, UserInput } from '../models/User';

export interface IUserRepository {
  create(user: UserInput): Promise<UserDocument>;
  findByEmail(email: string): Promise<UserDocument | null>;
  findById(id: string): Promise<UserDocument | null>;
  findAll(): Promise<UserDocument[]>;
  update(id: string, userData: Partial<UserInput>): Promise<UserDocument | null>;
  delete(id: string): Promise<boolean>;
}

export class UserRepository implements IUserRepository {
  async create(user: UserInput): Promise<UserDocument> {
    return User.create(user);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return User.findOne({ email });
  }

  async findById(id: string): Promise<UserDocument | null> {
    return User.findById(id);
  }

  async findAll(): Promise<UserDocument[]> {
    return User.find();
  }

  async update(id: string, userData: Partial<UserInput>): Promise<UserDocument | null> {
    return User.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id);
    return !!result;
  }
}