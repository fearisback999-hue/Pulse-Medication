export interface Registration {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message?: string;
  street: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  course_selection: string;
  course_date: string;
  terms_accepted: boolean;
  payment_status: "pending" | "completed" | "failed";
  stripe_session_id?: string;
  stripe_payment_intent_id?: string;
  created_at: string;
  updated_at: string;
}
