import { DBCatchable } from '../../library/Decorators/DBCatchable';
import { IUser } from '../Models/User';
import { User } from '../Models/User';
import { UserRole } from '../Models/UserRole';
import { RoleNotFound } from '../../library/Errors/Role';
import { DefaultRoles } from '../../library/Types/UserRole';

export class UserCRUD {
  @DBCatchable('Error creating user')
  public static async createUser(user: Omit<IUser, '_id'>): Promise<IUser> {
    const newUser = await User.create(user);
    const populatedUser = await newUser.populate('role');
    return populatedUser.toObject() as IUser;
  }

  @DBCatchable('Error fetching user by Google ID')
  public static async getUserByGoogleID(
    google_id: string
  ): Promise<IUser | null> {
    const user = await User.findOne({ google_id }).populate('role').lean();
    return user as IUser | null;
  }

  @DBCatchable('Error fetching user by ID')
  public static async getUserById(id: string): Promise<IUser | null> {
    const user = await User.findById(id).populate('role').lean();
    return user as IUser | null;
  }

  @DBCatchable('Error fetching user by ID')
  public static async addVolunteerUser(email: string): Promise<IUser | null> {
    const volunteerRole = await UserRole.findOne({
      name: DefaultRoles.Volunteer
    }).lean();

    if (!volunteerRole) {
      throw new RoleNotFound('Volunteer role not found');
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { role: volunteerRole._id },
      { new: true, runValidators: true }
    ).populate('role');

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser.toObject() as IUser;
  }

  @DBCatchable('Error fetching volunteer users')
  public static async getVolunteerUsers(): Promise<IUser[]> {
    const volunteerRole = await UserRole.findOne({
      name: DefaultRoles.Volunteer
    });

    if (!volunteerRole) {
      return [];
    }

    const volunteerUsers = await User.find({
      role: volunteerRole._id
    }).populate('role');

    return volunteerUsers.map((user) => user.toObject() as IUser);
  }

  @DBCatchable('Error removing volunteer user')
  public static async removeVolunteerUser(
    email: string
  ): Promise<IUser | null> {
    const volunteer = await User.findOne({
      email
    });

    if (!volunteer) {
      return null;
    }

    await volunteer.deleteOne({ new: false });

    return volunteer.toObject() as IUser;
  }

  @DBCatchable('Error adding admin user')
  public static async addAdminUser(email: string): Promise<IUser | null> {
    const adminRole = await UserRole.findOne({
      name: DefaultRoles.Admin
    }).lean();

    if (!adminRole) {
      throw new RoleNotFound('Admin role not found');
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { role: adminRole._id },
      { new: true, runValidators: true }
    ).populate('role');

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser.toObject() as IUser;
  }

  @DBCatchable('Error fetching admin users')
  public static async getAdminUsers(): Promise<IUser[]> {
    const adminRole = await UserRole.findOne({
      perm_level: { $gte: 10 }
    });

    if (!adminRole) {
      return [];
    }

    const adminUsers = await User.find({ role: adminRole._id }).populate(
      'role'
    );

    return adminUsers.map((user) => user.toObject() as IUser);
  }

  @DBCatchable('Error adding volunteer user')
  public static async addBasicUser(email: string): Promise<IUser | null> {
    const volunteerRole = await UserRole.findOne({
      name: DefaultRoles.Volunteer
    }).lean();

    if (!volunteerRole) {
      throw new RoleNotFound('Volunteer role not found');
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { role: volunteerRole._id },
      { new: true, runValidators: true }
    ).populate('role');

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser.toObject() as IUser;
  }

  @DBCatchable('Error fetching volunteer users')
  public static async getBasicUsers(): Promise<IUser[]> {
    const volunteerRole = await UserRole.findOne({
      name: DefaultRoles.Basic
    });

    if (!volunteerRole) {
      return [];
    }

    const volunteerUsers = await User.find({
      role: volunteerRole._id
    }).populate('role');

    return volunteerUsers.map((user) => user.toObject() as IUser);
  }
}
