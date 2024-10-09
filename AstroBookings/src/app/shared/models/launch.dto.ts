export type LaunchStatus = 'scheduled' | 'confirmed' | 'launched' | 'delayed' | 'aborted';

export interface LaunchDto {
  id: string;
  agencyId: string;
  rocketId: string;
  date: Date;
  mission: string;
  destination: string;
  pricePerSeat: number;
  status: LaunchStatus;
}

export const seedData: LaunchDto[] = [
  {
    id: '1',
    agencyId: '1',
    rocketId: '1',
    date: new Date(2029, 5, 1),
    mission: 'Moon Landing',
    destination: 'Moon',
    pricePerSeat: 100,
    status: 'scheduled',
  },
  {
    id: '2',
    agencyId: '2',
    rocketId: '2',
    date: new Date(2033, 8, 2),
    mission: 'Mars Flight',
    destination: 'Mars',
    pricePerSeat: 200,
    status: 'scheduled',
  },
];
