import { UserDto } from './user.dto';

/**
 * The user and token returned after a successful login or registration
 */
export type UserTokenDto = {
  /**
   * The user object
   * @example { id: 'user-1', name: 'John Doe', email: 'john.doe@example.com', role: 'traveler' }
   */
  user: UserDto;

  /**
   * The JWT token
   * @example 'abc123'
   */
  token: string;
};
