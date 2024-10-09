import { Role } from './role.enum';

/**
 * The input data required to register a new user
 */
export type RegisterDto = {
  /**
   * The name of the user
   * @example 'John Doe'
   */
  name: string;

  /**
   * The email of the user
   * @example 'john.doe@example.com'
   */
  email: string;

  /**
   * The password of the user
   * @example 'password'
   */
  password: string;

  /**
   * The role of the user
   * @example 'traveler'
   */
  role: Role;
};
