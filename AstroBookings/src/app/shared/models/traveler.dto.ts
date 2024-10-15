import { UserDto } from './user.dto';

export interface TravelerDto extends UserDto {
  contactPhone: string;
  contactEmail: string;
  emergencyContact: string;
  travelPreferences: Record<string, unknown>;
}
