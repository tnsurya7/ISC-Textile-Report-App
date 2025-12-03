import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPDF = (records, filename = 'report.pdf') => {
  const doc = new jsPDF();
  
  // Add logo
  try {
    const img = new Image();
    img.src = '/logo.png';
    doc.addImage(img, 'PNG', 14, 10, 25, 25);
  } catch (e) {
    console.log('Logo not added to PDF');
  }
  
  // Add title
  doc.setFontSize(16);
  doc.text('Indian Soft Colours – Digital Printing', 45, 20);
  doc.setFontSize(10);
  doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 45, 27);
  
  // Prepare table data
  const headers = [
    ['Date', 'Party DC', 'Padding DC', 'Party Name', 'Fabric Quality', 'Party Mtr', 'Padding Mtr', 
     'Short/Excess', 'Print Mtr', 'Fabric Mtr', 'Outward Mtr', 'Balance']
  ];
  
  const data = records.map(record => [
    record.date,
    record.partyDc,
    record.paddingDc,
    record.partyName,
    record.fabricQuality,
    record.partyMtr,
    record.paddingMtr,
    record.shortOrExcess,
    record.printMtr,
    record.fabricMtr,
    record.outwardMtr,
    record.balance
  ]);
  
  // Add table
  doc.autoTable({
    head: headers,
    body: data,
    startY: 35,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [66, 66, 66] },
    columnStyles: {
      0: { cellWidth: 18 },
      1: { cellWidth: 15 },
      2: { cellWidth: 15 },
      3: { cellWidth: 25 },
      4: { cellWidth: 25 },
      5: { cellWidth: 15 },
      6: { cellWidth: 15 },
      7: { cellWidth: 15 },
      8: { cellWidth: 15 },
      9: { cellWidth: 15 },
      10: { cellWidth: 15 },
      11: { cellWidth: 15 }
    },
    didDrawPage: (data) => {
      // Page number
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.text(
        `Page ${data.pageNumber} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
  });
  
  doc.save(filename);
};
