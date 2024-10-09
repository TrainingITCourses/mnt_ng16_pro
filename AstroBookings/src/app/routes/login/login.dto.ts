/**
 * The input data required to login a user
 */
export type LoginDto = {
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
};
