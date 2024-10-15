export type NotificationStatus = 'pending' | 'read' | 'sent' | 'failed';

export interface NotificationDto {
  id: string;
  userId: string;
  templateId: string;
  subject: string;
  message: string;
  data: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  status: NotificationStatus;
}
