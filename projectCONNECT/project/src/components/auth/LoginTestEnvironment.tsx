import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface TestUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

const testUsers: TestUser[] = [
  {
    id: '1',
    name: 'Coordenador Teste',
    email: 'coordenador@test.com',
    role: 'coordenador',
    permissions: ['manage_visitors', 'manage_decisions', 'manage_callbacks', 'manage_visits', 'manage_groups', 'view_reports', 'manage_users', 'manage_schedules', 'manage_system'],
  },
  {
    id: '2',
    name: 'Líder Teste',
    email: 'lider@test.com',
    role: 'lider',
    permissions: ['view_visitors', 'view_decisions', 'view_callbacks', 'manage_team_visits', 'manage_own_groups', 'approve_volunteers', 'view_team_schedule'],
  },
  {
    id: '3',
    name: 'Coleta Teste',
    email: 'coleta@test.com',
    role: 'coleta',
    permissions: ['register_visitors', 'view_registration_confirmation'],
  },
  {
    id: '4',
    name: 'Callback Teste',
    email: 'callback@test.com',
    role: 'callback',
    permissions: ['view_decisions_list', 'manage_callback_status', 'send_whatsapp'],
  },
  {
    id: '5',
    name: 'Visita Teste',
    email: 'visita@test.com',
    role: 'visita',
    permissions: ['view_visits', 'manage_visit_status', 'view_visit_history'],
  },
];

const LoginTestEnvironment = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleTestLogin = async (testUser: TestUser) => {
    try {
      // Use test@123 as the password for all test users
      await login(testUser.email, 'test@123');
      
      // Role-specific redirects
      switch (testUser.role) {
        case 'callback':
          navigate('/callback');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      console.error('Test login failed:', error);
    }
  };

  return (
    <div className="mt-8 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
      <div className="flex items-center mb-4">
        <div className="h-2 w-2 rounded-full bg-warning-500 animate-pulse mr-2"></div>
        <h3 className="text-sm font-medium text-neutral-900">Ambiente de Teste</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {testUsers.map((user) => (
          <button
            key={user.role}
            onClick={() => handleTestLogin(user)}
            className="flex items-center justify-center px-4 py-2 border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
          >
            Login como {user.name}
          </button>
        ))}
      </div>
      
      <p className="mt-4 text-xs text-neutral-500 text-center">
        Este ambiente de teste está disponível apenas em desenvolvimento
      </p>
    </div>
  );
};

export default LoginTestEnvironment;