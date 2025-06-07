import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
      <div className="rounded-full bg-error-100 p-3 mb-4">
        <svg
          className="h-12 w-12 text-error-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m0 0v2m0-2h2m-2 0H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">
        Acesso Negado
      </h2>
      <p className="text-neutral-600 mb-6">
        Você não tem permissão para acessar esta página.
      </p>
      <Link
        to="/dashboard"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
      >
        <Home className="h-4 w-4 mr-2" />
        Voltar para o Dashboard
      </Link>
    </div>
  );
};

export default AccessDenied;