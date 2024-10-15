export type InvoiceStatus = 'pending' | 'paid' | 'failed';

export interface InvoiceDto {
  id: string;
  number: string;
  agencyId: string;
  launchId: string;
  amount: number;
  issuedAt: Date;
  status: InvoiceStatus;
}
