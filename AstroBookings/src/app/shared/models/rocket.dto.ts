export type RocketRange = 'low_earth' | 'moon' | 'mars';

export interface RocketDto {
  id: string;
  agencyId: string;
  name: string;
  capacity: number;
  range: RocketRange;
}
