import { FC, useState } from 'react';
import { X, Phone, MessageSquare, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Contact {
  id: string;
  name: string;
  phone: string;
  status: 'new' | 'inProgress' | 'completed';
  decisionType: 'aceitou' | 'reconciliou';
  decisionDate: string;
  history: {
    date: string;
    status: string;
    notes: string;
  }[];
}

interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact;
  onUpdate: (contact: Contact) => void;
}

const CallbackModal: FC<CallbackModalProps> = ({
  isOpen,
  onClose,
  contact,
  onUpdate,
}) => {
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedContact: Contact = {
      ...contact,
      status: status as 'new' | 'inProgress' | 'completed',
      history: [
        ...contact.history,
        {
          date: new Date().toISOString(),
          status,
          notes,
        },
      ],
    };

    onUpdate(updatedContact);
    setNotes('');
    setStatus('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h3 className="text-lg font-medium text-neutral-900">Detalhes do Contato</h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Contact Info */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-neutral-500 mb-2">Informações do Contato</h4>
            <div className="bg-neutral-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-neutral-700">{contact.name}</div>
                  <div className="mt-1 flex items-center">
                    <MessageSquare className="h-4 w-4 text-primary-500 mr-1" />
                    <a
                      href={`https://wa.me/55${contact.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Data da Decisão</div>
                  <div className="mt-1 text-sm text-neutral-900">
                    {format(new Date(contact.decisionDate), 'dd/MM/yyyy')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-neutral-500 mb-2">Histórico</h4>
            <div className="space-y-4">
              {contact.history.map((entry, index) => (
                <div key={index} className="bg-neutral-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-neutral-700">
                      {format(new Date(entry.date), 'dd/MM/yyyy HH:mm')}
                    </div>
                    <span className="text-xs text-neutral-500">{entry.status}</span>
                  </div>
                  {entry.notes && (
                    <div className="mt-2 text-sm text-neutral-600">{entry.notes}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* New Entry Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  required
                >
                  <option value="">Selecione um status</option>
                  <option value="new">Novo contato</option>
                  <option value="inProgress">Em andamento</option>
                  <option value="completed">Concluído</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700">
                  Observações
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  placeholder="Digite suas observações..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CallbackModal;