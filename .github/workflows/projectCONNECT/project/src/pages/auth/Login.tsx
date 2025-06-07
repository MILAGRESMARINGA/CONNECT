import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserCircle2, Lock, ChevronRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const quickAccess = [
    { role: 'coordenador', label: 'Coordenador', color: 'bg-primary-600 hover:bg-primary-700' },
    { role: 'lider', label: 'Líder', color: 'bg-accent-600 hover:bg-accent-700' },
    { role: 'coleta', label: 'Coletor', color: 'bg-success-600 hover:bg-success-700' },
    { role: 'callback', label: 'Callback', color: 'bg-warning-600 hover:bg-warning-700' },
    { role: 'visita', label: 'Visita', color: 'bg-neutral-600 hover:bg-neutral-700' },
  ];

  const handleQuickAccess = async (role: string) => {
    setLoading(true);
    try {
      // Use test@123 as the password for all test users
      await login(`${role}@test.com`, 'test@123');
      navigate('/');
    } catch (err) {
      setError('Erro ao realizar login rápido. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-error-50 text-error-700 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-900">
            Email
          </label>
          <div className="mt-1.5 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserCircle2 className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-neutral-300 rounded-md shadow-sm bg-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
              placeholder="Seu email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-900">
            Senha
          </label>
          <div className="mt-1.5 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-neutral-300 rounded-md shadow-sm bg-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
              placeholder="Sua senha"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
              Lembrar-me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-primary-600 hover:text-primary-700">
              Esqueceu sua senha?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#B25929] hover:bg-[#A04D20] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors duration-200"
          >
            {loading ? 'Carregando...' : 'Entrar'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Quick Access Section */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">
              Para demonstração, use os acessos rápidos
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {quickAccess.map(({ role, label, color }) => (
            <button
              key={role}
              onClick={() => handleQuickAccess(role)}
              disabled={loading}
              className={`${color} text-white py-2 px-4 rounded-md text-sm font-medium shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Development Environment Notice */}
      {import.meta.env.MODE === 'development' && (
        <div className="mt-8 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="flex items-center mb-2">
            <div className="h-2 w-2 rounded-full bg-warning-500 animate-pulse mr-2"></div>
            <p className="text-sm font-medium text-neutral-900">Ambiente de Desenvolvimento</p>
          </div>
          <p className="text-xs text-neutral-500">
            Os acessos rápidos estão disponíveis apenas em ambiente de desenvolvimento.
            Todos os usuários de teste usam a senha: test@123
          </p>
        </div>
      )}
    </>
  );
};

export default Login;