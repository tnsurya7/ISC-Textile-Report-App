import * as XLSX from 'xlsx';

export const exportToExcel = (records, filename = 'report.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(
    records.map(record => ({
      'Date': record.date,
      'Party DC': record.partyDc,
      'Padding DC': record.paddingDc,
      'Party Name': record.partyName,
      'Fabric Quality': record.fabricQuality,
      'Party Mtr': record.partyMtr,
      'Padding Mtr': record.paddingMtr,
      'Short/Excess': record.shortOrExcess,
      'Print Mtr': record.printMtr,
      'Fabric Mtr': record.fabricMtr,
      'Outward Mtr': record.outwardMtr,
      'Balance': record.balance
    }))
  );
  
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Records');
  
  XLSX.writeFile(workbook, filename);
};
