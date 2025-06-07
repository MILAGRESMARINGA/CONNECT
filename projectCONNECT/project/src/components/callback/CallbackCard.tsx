import { FC } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { MessageSquare, Clock } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

interface CallbackCardProps {
  contact: Contact;
  onClick: () => void;
}

const CallbackCard: FC<CallbackCardProps> = ({ contact, onClick }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: contact.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-warning-100 text-warning-800';
      case 'inProgress':
        return 'bg-primary-100 text-primary-800';
      case 'completed':
        return 'bg-success-100 text-success-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'Novo';
      case 'inProgress':
        return 'Em andamento';
      case 'completed':
        return 'Concluído';
      default:
        return status;
    }
  };

  const lastHistory = contact.history[contact.history.length - 1];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow border border-neutral-200 p-4 cursor-move hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-medium text-neutral-900">{contact.name}</h4>
          <div className="mt-1 flex items-center">
            <MessageSquare className="h-4 w-4 text-primary-500 mr-1" />
            <a
              href={`https://wa.me/55${contact.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-600 hover:text-primary-700"
              onClick={(e) => e.stopPropagation()}
            >
              WhatsApp
            </a>
          </div>
        </div>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
          {getStatusText(contact.status)}
        </span>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center text-xs text-neutral-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>
            Decisão: {format(new Date(contact.decisionDate), 'dd/MM/yyyy')}
          </span>
        </div>

        {lastHistory && (
          <div className="text-xs text-neutral-600 bg-neutral-50 p-2 rounded">
            <div className="font-medium">
              {formatDistanceToNow(new Date(lastHistory.date), {
                addSuffix: true,
                locale: ptBR,
              })}
            </div>
            <div className="mt-1">{lastHistory.notes || lastHistory.status}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallbackCard;