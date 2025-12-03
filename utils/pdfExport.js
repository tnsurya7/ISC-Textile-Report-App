import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPDF = (records, filename = 'report.pdf') => {
  // Detect if mobile device (exclude macOS/desktop)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && !/Macintosh|Windows|Linux/i.test(navigator.userAgent);
  const orientation = isMobile ? 'portrait' : 'landscape';
  const doc = new jsPDF(orientation);
  
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
    styles: { fontSize: 7, cellPadding: 2, halign: 'center' },
    headStyles: { fillColor: [66, 66, 66], fontSize: 7, fontStyle: 'bold', halign: 'center' },
    margin: { left: 5, right: 5 },
    tableWidth: 'auto',
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
