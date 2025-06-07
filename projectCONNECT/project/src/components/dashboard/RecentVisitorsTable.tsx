import { UserCheck, MapPin, Phone } from 'lucide-react';

const RecentVisitorsTable = () => {
  // Mock data for recent visitors
  const visitors = [
    {
      id: 1,
      name: 'Luciana Ferreira',
      date: '14/05/2023',
      firstTime: true,
      decision: true,
      callback: true,
      visited: false,
      smallGroup: false,
    },
    {
      id: 2,
      name: 'Ricardo Gomes',
      date: '14/05/2023',
      firstTime: true,
      decision: false,
      callback: false,
      visited: false,
      smallGroup: false,
    },
    {
      id: 3,
      name: 'Patrícia Almeida',
      date: '13/05/2023',
      firstTime: false,
      decision: false,
      callback: true,
      visited: true,
      smallGroup: true,
    },
    {
      id: 4,
      name: 'Gabriel Santos',
      date: '12/05/2023',
      firstTime: true,
      decision: true,
      callback: true,
      visited: true,
      smallGroup: false,
    },
    {
      id: 5,
      name: 'Mariana Costa',
      date: '11/05/2023',
      firstTime: true,
      decision: true,
      callback: true,
      visited: false,
      smallGroup: false,
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-200">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Visitante
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Data
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {visitors.map((visitor) => (
            <tr key={visitor.id} className="hover:bg-neutral-50">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                    {visitor.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-neutral-900">{visitor.name}</div>
                    <div className="text-xs text-neutral-500">
                      {visitor.firstTime ? '1ª visita' : 'Retorno'}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                {visitor.date}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex space-x-2">
                  <span
                    className={`inline-flex items-center p-1 rounded-full ${
                      visitor.decision ? 'bg-success-100 text-success-700' : 'bg-neutral-100 text-neutral-400'
                    }`}
                    title={visitor.decision ? 'Decisão realizada' : 'Sem decisão'}
                  >
                    <UserCheck className="h-4 w-4" />
                  </span>
                  <span
                    className={`inline-flex items-center p-1 rounded-full ${
                      visitor.callback ? 'bg-success-100 text-success-700' : 'bg-neutral-100 text-neutral-400'
                    }`}
                    title={visitor.callback ? 'Callback realizado' : 'Callback pendente'}
                  >
                    <Phone className="h-4 w-4" />
                  </span>
                  <span
                    className={`inline-flex items-center p-1 rounded-full ${
                      visitor.smallGroup ? 'bg-success-100 text-success-700' : 'bg-neutral-100 text-neutral-400'
                    }`}
                    title={visitor.smallGroup ? 'Indicado para GC' : 'Não indicado para GC'}
                  >
                    <MapPin className="h-4 w-4" />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentVisitorsTable;