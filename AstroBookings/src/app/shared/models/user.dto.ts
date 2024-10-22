export type UserRole = 'traveler' | 'agency' | 'employee';
export interface UserDto {
  id: string;
  email: string;
  role: UserRole;
}
