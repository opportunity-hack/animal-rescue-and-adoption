import { RoleNotFound } from '../../library/Errors/Role';
import { DBCatchable } from '../../library/Decorators/DBCatchable';
import { IUserRole, UserRole } from '../Models/UserRole';

export class UserRoleCRUD {
  @DBCatchable('Error creating user')
  public static async findRoleByName(name: string): Promise<IUserRole> {
    const result = await UserRole.findOne({ name });
    if (!result) throw new RoleNotFound('Role not found');

    return result;
  }
}
