-- Fix the database table structure
-- Run this in Supabase SQL Editor

-- Drop the existing table
DROP TABLE IF EXISTS records CASCADE;

-- Recreate the table with correct column names
CREATE TABLE records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date TEXT NOT NULL,
  "dcNo" TEXT NOT NULL,
  "partyName" TEXT NOT NULL,
  "fabricQuality" TEXT NOT NULL,
  "partyMtr" NUMERIC NOT NULL,
  "paddingMtr" NUMERIC NOT NULL,
  "shortOrExcess" NUMERIC NOT NULL,
  "printMtr" NUMERIC NOT NULL,
  "fabricMtr" NUMERIC NOT NULL,
  "outwardMtr" NUMERIC NOT NULL,
  balance NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_records_date ON records(date);
CREATE INDEX idx_records_party_name ON records("partyName");
CREATE INDEX idx_records_fabric_quality ON records("fabricQuality");
CREATE INDEX idx_records_created_at ON records(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE records ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since no auth is required)
CREATE POLICY "Allow all operations" ON records
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Insert sample data
INSERT INTO records (date, "dcNo", "partyName", "fabricQuality", "partyMtr", "paddingMtr", "shortOrExcess", "printMtr", "fabricMtr", "outwardMtr", balance)
VALUES 
  ('2024-01-15', 'DC001', 'ABC Textiles', 'Cotton Premium', 100.50, 5.25, -2.00, 103.75, 98.50, 95.00, 3.50),
  ('2024-01-16', 'DC002', 'XYZ Fabrics', 'Silk Blend', 200.00, 10.00, 3.50, 213.50, 203.50, 200.00, 3.50),
  ('2024-01-17', 'DC003', 'PQR Industries', 'Polyester', 150.75, 7.50, 0.00, 158.25, 150.75, 150.00, 0.75);
