export interface PaymentRecord {
  id: string;
  registration_id: string;
  stripe_session_id: string;
  stripe_payment_intent_id: string;
  amount: number;
  currency: string;
  status: "pending" | "succeeded" | "failed" | "refunded";
  receipt_url?: string;
  created_at: string;
}
