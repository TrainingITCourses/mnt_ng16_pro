export type LogLevel = 'info' | 'warning' | 'error';

export interface EntryLogDto {
  id: string;
  level: LogLevel;
  message: string;
  timestamp: Date;
  data: Record<string, unknown>;
}
