export interface TravelPreferences {
  preferredDestination: string;
  dietaryRestrictions: string;
}

export interface PassengerDto {
  id: string;
  contactPhone: string;
  contactEmail: string;
  emergencyContact: string;
  travelPreferences: TravelPreferences;
}
