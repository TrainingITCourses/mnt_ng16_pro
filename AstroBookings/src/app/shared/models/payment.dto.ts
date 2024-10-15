export interface PaymentDto {
  id: string;
  invoiceId: string;
  amount: number;
  paidAt: Date;
}
