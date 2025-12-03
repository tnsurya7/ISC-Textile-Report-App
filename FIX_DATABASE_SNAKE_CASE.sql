-- Drop and recreate table with snake_case column names (PostgreSQL standard)

DROP TABLE IF EXISTS records CASCADE;

CREATE TABLE records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date TEXT NOT NULL,
  dc_no TEXT NOT NULL,
  party_name TEXT NOT NULL,
  fabric_quality TEXT NOT NULL,
  party_mtr NUMERIC NOT NULL,
  padding_mtr NUMERIC NOT NULL,
  short_or_excess NUMERIC NOT NULL,
  print_mtr NUMERIC NOT NULL,
  fabric_mtr NUMERIC NOT NULL,
  outward_mtr NUMERIC NOT NULL,
  balance NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_records_date ON records(date);
CREATE INDEX idx_records_party_name ON records(party_name);
CREATE INDEX idx_records_fabric_quality ON records(fabric_quality);
CREATE INDEX idx_records_created_at ON records(created_at DESC);

-- Enable RLS
ALTER TABLE records ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Allow all operations" ON records
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Insert sample data
INSERT INTO records (date, dc_no, party_name, fabric_quality, party_mtr, padding_mtr, short_or_excess, print_mtr, fabric_mtr, outward_mtr, balance)
VALUES 
  ('2024-01-15', 'DC001', 'ABC Textiles', 'Cotton Premium', 100.50, 5.25, -2.00, 103.75, 98.50, 95.00, 3.50),
  ('2024-01-16', 'DC002', 'XYZ Fabrics', 'Silk Blend', 200.00, 10.00, 3.50, 213.50, 203.50, 200.00, 3.50),
  ('2024-01-17', 'DC003', 'PQR Industries', 'Polyester', 150.75, 7.50, 0.00, 158.25, 150.75, 150.00, 0.75);
