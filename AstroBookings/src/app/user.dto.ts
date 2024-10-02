import { Role } from './role.enum';

/**
 * The User data transfer object
 */
export type UserDto = {
  /**
   * The user's ID
   * @example 'user-1'
   */
  id: string;

  /**
   * The user's name
   * @example 'John Doe'
   */
  name: string;

  /**
   * The user's email
   * @example 'john.doe@example.com'
   */
  email: string;

  /**
   * The user's role
   * @example 'traveler'
   */
  role: Role;
};
