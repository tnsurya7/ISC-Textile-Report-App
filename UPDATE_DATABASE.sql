-- Make dc_no optional (not required)
ALTER TABLE records ALTER COLUMN dc_no DROP NOT NULL;

-- Make all other columns nullable (not required)
ALTER TABLE records ALTER COLUMN party_name DROP NOT NULL;
ALTER TABLE records ALTER COLUMN fabric_quality DROP NOT NULL;
ALTER TABLE records ALTER COLUMN party_mtr DROP NOT NULL;
ALTER TABLE records ALTER COLUMN padding_mtr DROP NOT NULL;
ALTER TABLE records ALTER COLUMN short_or_excess DROP NOT NULL;
ALTER TABLE records ALTER COLUMN print_mtr DROP NOT NULL;
ALTER TABLE records ALTER COLUMN fabric_mtr DROP NOT NULL;
ALTER TABLE records ALTER COLUMN outward_mtr DROP NOT NULL;
ALTER TABLE records ALTER COLUMN balance DROP NOT NULL;

-- Change numeric columns to text (to allow text or numbers)
ALTER TABLE records ALTER COLUMN party_mtr TYPE text USING party_mtr::text;
ALTER TABLE records ALTER COLUMN padding_mtr TYPE text USING padding_mtr::text;
ALTER TABLE records ALTER COLUMN short_or_excess TYPE text USING short_or_excess::text;
ALTER TABLE records ALTER COLUMN print_mtr TYPE text USING print_mtr::text;
ALTER TABLE records ALTER COLUMN fabric_mtr TYPE text USING fabric_mtr::text;
ALTER TABLE records ALTER COLUMN outward_mtr TYPE text USING outward_mtr::text;
ALTER TABLE records ALTER COLUMN balance TYPE text USING balance::text;

-- Update existing records to have empty values for new columns if null
UPDATE records SET party_dc = '' WHERE party_dc IS NULL;
UPDATE records SET padding_dc = '' WHERE padding_dc IS NULL;
