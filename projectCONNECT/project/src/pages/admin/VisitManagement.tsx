import { useState } from 'react';
import { Home, Search, Filter, Plus, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';

const VisitManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock visits data
  const visits = [
    {
      id: '1',
      visitor: 'Ana Beatriz Silva',
      address: 'Rua Augusta, 1500 - Consolação',
      date: '15/05/2023',
      time: '14:00',
      status: 'pending',
      type: 'acolhimento',
      assigned: 'Carlos e Maria',
    },
    {
      id: '2',
      visitor: 'Roberto Almeida',
      address: 'Av. Paulista, 900 - Bela Vista',
      date: '16/05/2023',
      time: '10:00',
      status: 'scheduled',
      type: 'social',
      assigned: 'João e Marta',
    },
    {
      id: '3',
      visitor: 'Juliana Costa',
      address: 'Rua Oscar Freire, 500 - Jardins',
      date: '14/05/2023',
      time: '16:00',
      status: 'completed',
      type: 'acolhimento',
      assigned: 'Paulo e Fernanda',
    },
    {
      id: '4',
      visitor: 'Eduardo Santos',
      address: 'Rua Haddock Lobo, 300 - Cerqueira César',
      date: '17/05/2023',
      time: '19:00',
      status: 'scheduled',
      type: 'espiritual',
      assigned: 'Ricardo e Ana',
    },
    {
      id: '5',
      visitor: 'Fernanda Lima',
      address: 'Rua da Consolação, 2000 - Consolação',
      date: '13/05/2023',
      time: '15:00',
      status: 'completed',
      type: 'discipulado',
      assigned: 'André e Cristina',
    },
    {
      id: '6',
      visitor: 'Marcelo Oliveira',
      address: 'Av. Rebouças, 1500 - Pinheiros',
      date: '18/05/2023',
      time: '10:00',
      status: 'canceled',
      type: 'acolhimento',
      assigned: 'Roberto e Julia',
    },
  ];

  // Helper function to get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: 'Pendente', color: 'bg-warning-100 text-warning-800' };
      case 'scheduled':
        return { text: 'Agendada', color: 'bg-primary-100 text-primary-800' };
      case 'completed':
        return { text: 'Realizada', color: 'bg-success-100 text-success-800' };
      case 'canceled':
        return { text: 'Cancelada', color: 'bg-error-100 text-error-800' };
      default:
        return { text: 'Desconhecido', color: 'bg-neutral-100 text-neutral-800' };
    }
  };

  // Helper function to get type label
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'acolhimento':
        return { text: 'Acolhimento', color: 'bg-primary-100 text-primary-800' };
      case 'social':
        return { text: 'Social', color: 'bg-accent-100 text-accent-800' };
      case 'espiritual':
        return { text: 'Espiritual', color: 'bg-success-100 text-success-800' };
      case 'discipulado':
        return { text: 'Discipulado', color: 'bg-primary-100 text-primary-800' };
      default:
        return { text: 'Desconhecido', color: 'bg-neutral-100 text-neutral-800' };
    }
  };

  // Filter visits based on active tab
  const filteredVisits = visits.filter(visit => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return visit.status === 'pending';
    if (activeTab === 'scheduled') return visit.status === 'scheduled';
    if (activeTab === 'completed') return visit.status === 'completed';
    if (activeTab === 'canceled') return visit.status === 'canceled';
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-warning-500" />;
      case 'scheduled':
        return <Calendar className="h-4 w-4 text-primary-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success-500" />;
      case 'canceled':
        return <XCircle className="h-4 w-4 text-error-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-neutral-800">Gestão de Visitas</h1>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <Plus className="h-4 w-4 mr-2" />
            Nova Visita
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por visitante ou endereço..."
              className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <Calendar className="h-4 w-4 mr-2" />
              Calendário
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`${
              activeTab === 'all'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`${
              activeTab === 'pending'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`${
              activeTab === 'scheduled'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Agendadas
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`${
              activeTab === 'completed'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Realizadas
          </button>
          <button
            onClick={() => setActiveTab('canceled')}
            className={`${
              activeTab === 'canceled'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Canceladas
          </button>
        </nav>
      </div>

      {/* Visits Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Visitante
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Endereço
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Responsável
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredVisits.map((visit) => (
                <tr key={visit.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                        {visit.visitor.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">
                          {visit.visitor}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-500">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2 text-neutral-400" />
                      {visit.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-neutral-400" />
                      {visit.date}, {visit.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeLabel(visit.type).color}`}>
                      {getTypeLabel(visit.type).text}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(visit.status)}
                      <span className={`ml-1.5 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusLabel(visit.status).color}`}>
                        {getStatusLabel(visit.status).text}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {visit.assigned}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-primary-600 hover:text-primary-900">
                      Detalhes
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VisitManagement;