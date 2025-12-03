-- Note: PostgreSQL doesn't support reordering columns directly.
-- You need to recreate the table with the correct order.
-- This will preserve all your data.

-- Step 1: Create new table with correct column order
CREATE TABLE records_new (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    date text NOT NULL,
    party_dc text,
    padding_dc text,
    party_name text,
    fabric_quality text,
    party_mtr text,
    padding_mtr text,
    short_or_excess text,
    print_mtr text,
    fabric_mtr text,
    outward_mtr text,
    balance text,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT records_new_pkey PRIMARY KEY (id)
);

-- Step 2: Copy all data from old table to new table
INSERT INTO records_new (id, date, party_dc, padding_dc, party_name, fabric_quality, party_mtr, padding_mtr, short_or_excess, print_mtr, fabric_mtr, outward_mtr, balance, created_at)
SELECT 
    id, 
    date, 
    party_dc, 
    padding_dc, 
    party_name, 
    fabric_quality, 
    party_mtr::text, 
    padding_mtr::text, 
    short_or_excess::text, 
    print_mtr::text, 
    fabric_mtr::text, 
    outward_mtr::text, 
    balance::text, 
    created_at
FROM records;

-- Step 3: Drop old table
DROP TABLE records;

-- Step 4: Rename new table to original name
ALTER TABLE records_new RENAME TO records;

-- Step 5: Enable RLS (Row Level Security)
ALTER TABLE records ENABLE ROW LEVEL SECURITY;

-- Step 6: Create RLS policies
CREATE POLICY "Enable read access for all users" ON records FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON records FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON records FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON records FOR DELETE USING (true);
