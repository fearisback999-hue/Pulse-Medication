-- Pulse Medication Database Schema
-- Run this in your Supabase SQL Editor

-- Registrations table
CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  street TEXT NOT NULL,
  street2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'US',
  course_selection TEXT NOT NULL DEFAULT 'EKG Monitor Tech Certification',
  course_date TEXT NOT NULL,
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  enrollment_status TEXT NOT NULL DEFAULT 'registered' CHECK (enrollment_status IN ('registered', 'enrolled', 'completed', 'withdrawn')),
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_payment_status ON registrations(payment_status);
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);

-- Payments table
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  registration_id UUID NOT NULL REFERENCES registrations(id),
  stripe_session_id TEXT NOT NULL UNIQUE,
  stripe_payment_intent_id TEXT,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_payments_registration_id ON payments(registration_id);
CREATE INDEX idx_payments_status ON payments(status);

-- Course dates table
CREATE TABLE course_dates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date TEXT NOT NULL,
  start_time TEXT NOT NULL DEFAULT '9:00 AM',
  end_time TEXT NOT NULL DEFAULT '5:00 PM',
  timezone TEXT NOT NULL DEFAULT 'PST',
  is_active BOOLEAN NOT NULL DEFAULT true,
  max_capacity INTEGER DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed initial course dates
INSERT INTO course_dates (date) VALUES
  ('06/12/2026'),
  ('06/13/2026'),
  ('06/14/2026'),
  ('06/16/2026');

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_dates ENABLE ROW LEVEL SECURITY;

-- Public can read active course dates
CREATE POLICY "Public can read active course dates" ON course_dates
  FOR SELECT USING (is_active = true);

-- Authenticated admin has full access
CREATE POLICY "Admin full access registrations" ON registrations
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access payments" ON payments
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access course_dates" ON course_dates
  FOR ALL USING (auth.role() = 'authenticated');
