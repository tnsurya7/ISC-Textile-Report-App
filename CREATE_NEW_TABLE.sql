-- Drop existing table
DROP TABLE IF EXISTS records;

-- Create new records table with correct structure
CREATE TABLE records (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    date text,
    party_dc text,
    padding_dc text,
    party_name text,
    fabric_quality text,
    party_mtr text,
    padding_mtr text,
    short_or_excess text,
    print_mtr text,
    outward_mtr text,
    balance text,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT records_pkey PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE records ENABLE ROW LEVEL SECURITY;

-- Create RLS policies to allow all operations
CREATE POLICY "Enable read access for all users" ON records FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON records FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON records FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON records FOR DELETE USING (true);
