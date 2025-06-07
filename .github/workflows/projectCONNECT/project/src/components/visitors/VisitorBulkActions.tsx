import { FC } from 'react';
import { MessageSquare, Download, Users, Check, X } from 'lucide-react';

interface Visitor {
  id: string;
  name: string;
  phone: string;
}

interface BulkActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
  visitors: Visitor[];
}

const VisitorBulkActions: FC<BulkActionsProps> = ({ selectedCount, onClearSelection, visitors }) => {
  const handleWhatsAppBulk = () => {
    const numbers = visitors.map(v => v.phone.replace(/\D/g, '')).join(',');
    window.open(`https://wa.me/55${numbers}`, '_blank');
  };

  const handleExportPDF = () => {
    // Implement PDF export
    console.log('Exporting to PDF...');
  };

  const handleExportExcel = () => {
    // Implement Excel export
    console.log('Exporting to Excel...');
  };

  const handleMarkAsSmallGroup = () => {
    // Implement marking as small group
    console.log('Marking as small group...');
  };

  const handleMarkAsContacted = () => {
    // Implement marking as contacted
    console.log('Marking as contacted...');
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-neutral-200 p-4 z-50">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-neutral-700">
          {selectedCount} visitante{selectedCount !== 1 ? 's' : ''} selecionado{selectedCount !== 1 ? 's' : ''}
        </span>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleWhatsAppBulk}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            WhatsApp
          </button>

          <button
            onClick={handleExportPDF}
            className="inline-flex items-center px-3 py-2 border border-neutral-300 text-sm leading-4 font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </button>

          <button
            onClick={handleExportExcel}
            className="inline-flex items-center px-3 py-2 border border-neutral-300 text-sm leading-4 font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Excel
          </button>

          <button
            onClick={handleMarkAsSmallGroup}
            className="inline-flex items-center px-3 py-2 border border-neutral-300 text-sm leading-4 font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
          >
            <Users className="h-4 w-4 mr-2" />
            Encaminhar GC
          </button>

          <button
            onClick={handleMarkAsContacted}
            className="inline-flex items-center px-3 py-2 border border-neutral-300 text-sm leading-4 font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
          >
            <Check className="h-4 w-4 mr-2" />
            Marcar Contato
          </button>

          <button
            onClick={onClearSelection}
            className="inline-flex items-center px-3 py-2 border border-neutral-300 text-sm leading-4 font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitorBulkActions;