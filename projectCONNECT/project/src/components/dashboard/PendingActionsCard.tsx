import { Phone, Home, Users } from 'lucide-react';

interface PendingAction {
  id: number;
  type: 'callback' | 'visita' | 'gc';
  name: string;
  date: string;
  status: string;
}

interface PendingActionsCardProps {
  actions: PendingAction[];
}

const PendingActionsCard: React.FC<PendingActionsCardProps> = ({ actions }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'callback':
        return <Phone className="h-4 w-4 text-primary-500" />;
      case 'visita':
        return <Home className="h-4 w-4 text-accent-500" />;
      case 'gc':
        return <Users className="h-4 w-4 text-success-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const getActionTypeText = (type: string) => {
    switch (type) {
      case 'callback':
        return 'Ligação pendente';
      case 'visita':
        return 'Visita agendada';
      case 'gc':
        return 'Indicação para GC';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-5 border-b border-neutral-200">
        <h2 className="text-lg font-medium text-neutral-800">Ações Pendentes</h2>
      </div>
      <ul className="divide-y divide-neutral-200 max-h-96 overflow-y-auto">
        {actions.map((action) => (
          <li key={action.id}>
            <a href="#" className="block hover:bg-neutral-50">
              <div className="px-5 py-4">
                <div className="flex items-center space-x-3">
                  {getIcon(action.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">
                      {action.name}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {getActionTypeText(action.type)} • {formatDate(action.date)}
                    </p>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      action.status === 'pendente' ? 'bg-warning-100 text-warning-800' : 'bg-success-100 text-success-800'
                    }`}>
                      {action.status === 'pendente' ? 'Pendente' : 'Agendada'}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="bg-neutral-50 px-5 py-3">
        <div className="text-sm">
          <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
            Ver todas
          </a>
        </div>
      </div>
    </div>
  );
};

export default PendingActionsCard;