import { FC } from 'react';
import { Download } from 'lucide-react';
import { utils, writeFile } from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface ExportButtonProps {
  data: any[];
  filename: string;
  type: 'excel' | 'pdf';
}

const ExportButton: FC<ExportButtonProps> = ({ data, filename, type }) => {
  const exportToExcel = () => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    writeFile(wb, `${filename}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    // @ts-ignore
    doc.autoTable({
      head: [Object.keys(data[0])],
      body: data.map(Object.values),
    });
    doc.save(`${filename}.pdf`);
  };

  return (
    <button
      onClick={() => type === 'excel' ? exportToExcel() : exportToPDF()}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
    >
      <Download className="h-4 w-4 mr-2" />
      Exportar {type === 'excel' ? 'Excel' : 'PDF'}
    </button>
  );
};

export default ExportButton;