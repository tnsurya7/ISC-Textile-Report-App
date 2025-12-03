// Convert frontend camelCase to database snake_case
export const toSnakeCase = (obj) => {
  return {
    date: obj.date,
    party_dc: obj.partyDc,
    padding_dc: obj.paddingDc,
    party_name: obj.partyName,
    fabric_quality: obj.fabricQuality,
    party_mtr: obj.partyMtr,
    padding_mtr: obj.paddingMtr,
    short_or_excess: obj.shortOrExcess,
    print_mtr: obj.printMtr,
    fabric_mtr: obj.fabricMtr,
    outward_mtr: obj.outwardMtr,
    balance: obj.balance
  };
};

// Convert database snake_case to frontend camelCase
export const toCamelCase = (obj) => {
  return {
    id: obj.id,
    date: obj.date,
    partyDc: obj.party_dc,
    paddingDc: obj.padding_dc,
    partyName: obj.party_name,
    fabricQuality: obj.fabric_quality,
    partyMtr: obj.party_mtr,
    paddingMtr: obj.padding_mtr,
    shortOrExcess: obj.short_or_excess,
    printMtr: obj.print_mtr,
    fabricMtr: obj.fabric_mtr,
    outwardMtr: obj.outward_mtr,
    balance: obj.balance,
    created_at: obj.created_at
  };
};

// Convert array of records
export const toCamelCaseArray = (arr) => {
  return arr.map(toCamelCase);
};
