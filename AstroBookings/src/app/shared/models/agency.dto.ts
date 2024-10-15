import { UserDto } from './user.dto';

export interface AgencyDto extends UserDto {
  description: string;
  contactInfo: string;
  contactEmail: string;
  legalName: string;
  legalTaxId: string;
  legalAddress: string;
}
