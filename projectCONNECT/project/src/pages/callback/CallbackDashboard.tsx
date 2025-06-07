import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Phone, MessageSquare, Clock, CheckCircle, XCircle, LogOut } from 'lucide-react';
import CallbackColumn from '../../components/callback/CallbackColumn';
import CallbackCard from '../../components/callback/CallbackCard';
import CallbackModal from '../../components/callback/CallbackModal';

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
  assignedTo: string;
}

const CallbackDashboard = () => {
  const { user, logout } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data initialization
  useEffect(() => {
    const mockContacts: Contact[] = [
      {
        id: '1',
        name: 'Ana Silva',
        phone: '44999887766',
        status: 'new',
        decisionType: 'aceitou',
        decisionDate: '2024-03-15',
        history: [],
        assignedTo: user?.id || '',
      },
      {
        id: '2',
        name: 'João Santos',
        phone: '44988776655',
        status: 'inProgress',
        decisionType: 'reconciliou',
        decisionDate: '2024-03-14',
        history: [
          {
            date: '2024-03-14 15:30',
            status: 'Primeira tentativa',
            notes: 'Não atendeu, tentar novamente mais tarde',
          },
        ],
        assignedTo: user?.id || '',
      },
      {
        id: '3',
        name: 'Maria Oliveira',
        phone: '44977665544',
        status: 'completed',
        decisionType: 'aceitou',
        decisionDate: '2024-03-13',
        history: [
          {
            date: '2024-03-13 10:00',
            status: 'Contato realizado',
            notes: 'Confirmou presença no próximo culto',
          },
        ],
        assignedTo: user?.id || '',
      },
    ];

    setContacts(mockContacts);
  }, [user]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeContact = contacts.find(c => c.id === active.id);
    const overColumn = over.id;

    if (activeContact && activeContact.status !== overColumn) {
      setContacts(prevContacts => 
        prevContacts.map(contact =>
          contact.id === active.id
            ? {
                ...contact,
                status: overColumn as 'new' | 'inProgress' | 'completed',
                history: [
                  ...contact.history,
                  {
                    date: new Date().toISOString(),
                    status: `Movido para ${overColumn}`,
                    notes: '',
                  },
                ],
              }
            : contact
        )
      );
    }
  };

  const handleCardClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setIsModalOpen(false);
  };

  const getColumnContacts = (status: 'new' | 'inProgress' | 'completed') => {
    return contacts.filter(contact => contact.status === status);
  };

  const stats = {
    new: getColumnContacts('new').length,
    inProgress: getColumnContacts('inProgress').length,
    completed: getColumnContacts('completed').length,
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">Painel de Callbacks</h1>
              <p className="mt-1 text-sm text-neutral-500">
                Olá, {user?.name}
              </p>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </button>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border border-neutral-200">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-warning-500 mr-2" />
                <span className="text-sm font-medium text-neutral-700">Novos</span>
                <span className="ml-auto text-lg font-semibold text-warning-600">{stats.new}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-neutral-200">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary-500 mr-2" />
                <span className="text-sm font-medium text-neutral-700">Em Andamento</span>
                <span className="ml-auto text-lg font-semibold text-primary-600">{stats.inProgress}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-neutral-200">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                <span className="text-sm font-medium text-neutral-700">Concluídos</span>
                <span className="ml-auto text-lg font-semibold text-success-600">{stats.completed}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Kanban Board */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CallbackColumn
              title="Novos Contatos"
              status="new"
              icon={Clock}
              iconColor="text-warning-500"
            >
              {getColumnContacts('new').map(contact => (
                <CallbackCard
                  key={contact.id}
                  contact={contact}
                  onClick={() => handleCardClick(contact)}
                />
              ))}
            </CallbackColumn>

            <CallbackColumn
              title="Ligando"
              status="inProgress"
              icon={Phone}
              iconColor="text-primary-500"
            >
              {getColumnContacts('inProgress').map(contact => (
                <CallbackCard
                  key={contact.id}
                  contact={contact}
                  onClick={() => handleCardClick(contact)}
                />
              ))}
            </CallbackColumn>

            <CallbackColumn
              title="Concluído"
              status="completed"
              icon={CheckCircle}
              iconColor="text-success-500"
            >
              {getColumnContacts('completed').map(contact => (
                <CallbackCard
                  key={contact.id}
                  contact={contact}
                  onClick={() => handleCardClick(contact)}
                />
              ))}
            </CallbackColumn>
          </div>
        </DndContext>
      </div>

      {/* Contact Modal */}
      {selectedContact && (
        <CallbackModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          contact={selectedContact}
          onUpdate={handleUpdateContact}
        />
      )}
    </div>
  );
};

export default CallbackDashboard;