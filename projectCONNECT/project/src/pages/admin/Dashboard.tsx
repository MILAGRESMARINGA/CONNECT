import { 
  Users, 
  UserCheck, 
  Phone, 
  Home, 
  MapPin, 
  Calendar, 
  Clock,
  Gift 
} from 'lucide-react';
import StatCard from '../../components/dashboard/StatCard';
import PendingActionsCard from '../../components/dashboard/PendingActionsCard';
import MembershipChart from '../../components/dashboard/MembershipChart';
import RecentVisitorsTable from '../../components/dashboard/RecentVisitorsTable';
import IntegrationPipelineCard from '../../components/dashboard/IntegrationPipelineCard';
import VisitorDetailsModal from '../../components/dashboard/VisitorDetailsModal';

const Dashboard = () => {
  // Mock data for dashboard
  const stats = [
    { id: 1, name: 'Visitantes', value: '248', icon: Users, change: '+12%', changeType: 'increase' },
    { id: 2, name: 'Visitas Pendentes', value: '18', icon: Home, change: '+4%', changeType: 'increase' },
    { id: 3, name: 'Callbacks', value: '42', icon: Phone, change: '-8%', changeType: 'decrease' },
    { id: 4, name: 'Decisões', value: '74', icon: UserCheck, change: '+18%', changeType: 'increase' },
    { id: 5, name: 'GCs Ativos', value: '16', icon: MapPin, change: '0%', changeType: 'neutral' },
    { id: 6, name: 'Brindes', value: '187', icon: Gift, change: '+5%', changeType: 'increase' },
  ];

  const pendingActions = [
    { id: 1, type: 'callback', name: 'Ana Silva', date: '2023-05-15', status: 'pendente' },
    { id: 2, type: 'visita', name: 'João Pereira', date: '2023-05-16', status: 'agendada' },
    { id: 3, type: 'callback', name: 'Maria Santos', date: '2023-05-14', status: 'pendente' },
    { id: 4, type: 'gc', name: 'Carlos Oliveira', date: '2023-05-13', status: 'pendente' },
    { id: 5, type: 'visita', name: 'Fernanda Lima', date: '2023-05-17', status: 'agendada' },
  ];

  // Mock data for visitor details
  const visitorDetailsData = {
    demographics: {
      total: 248,
      growth: '+12%',
      ageGroups: [
        { label: '0-12', value: 15 },
        { label: '13-18', value: 28 },
        { label: '19-35', value: 95 },
        { label: '36-60', value: 85 },
        { label: '60+', value: 25 },
      ],
      gender: [
        { label: 'Masculino', value: 108 },
        { label: 'Feminino', value: 140 },
      ],
      cities: [
        { label: 'Maringá', value: 180 },
        { label: 'Sarandi', value: 35 },
        { label: 'Marialva', value: 20 },
        { label: 'Outras', value: 13 },
      ],
    },
    visitors: [
      {
        timestamp: '15/05/2023 09:30',
        dataConsent: true,
        name: 'Ana Beatriz Silva',
        phone: '(44) 98765-4321',
        firstVisit: true,
        church: 'Não',
        age: 28,
        location: 'Zona 7 - Maringá',
        zipCode: '87020-900',
      },
      {
        timestamp: '15/05/2023 10:15',
        dataConsent: true,
        name: 'Carlos Eduardo Santos',
        phone: '(44) 99876-5432',
        firstVisit: false,
        church: 'Igreja Batista',
        age: 35,
        location: 'Centro - Sarandi',
        zipCode: '87111-000',
      },
      // Add more mock data as needed
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-800">Dashboard</h1>
        <div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <Calendar className="h-4 w-4 mr-2" />
            Maio 2023
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.name}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            changeType={stat.changeType as 'increase' | 'decrease' | 'neutral'}
            modalContent={stat.name === 'Visitantes' ? <VisitorDetailsModal data={visitorDetailsData} /> : undefined}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Integration Pipeline */}
        <div className="lg:col-span-2">
          <IntegrationPipelineCard />
        </div>

        {/* Pending Actions */}
        <div>
          <PendingActionsCard actions={pendingActions} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Membership Growth Chart */}
        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-medium text-neutral-800 mb-4">Crescimento de Membros</h2>
          <MembershipChart />
        </div>

        {/* Recent Visitors */}
        <div className="bg-white shadow rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-neutral-800">Visitantes Recentes</h2>
            <span className="text-xs text-primary-600 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Últimos 7 dias
            </span>
          </div>
          <RecentVisitorsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;