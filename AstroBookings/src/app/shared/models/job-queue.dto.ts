export type JobType = 'launch_sync' | 'booking_sync';
export type JobStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface JobQueueDto {
  id: string;
  jobType: JobType;
  sourceId: string;
  status: JobStatus;
  createdAt: Date;
  executedAt: Date | null;
  data: Record<string, unknown>;
}
