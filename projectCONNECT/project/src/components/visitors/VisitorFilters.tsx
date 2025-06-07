import { FC } from 'react';
import { Filter } from 'lucide-react';

interface FiltersState {
  period: string;
  location: string;
  status: string;
  gender: string;
}

interface VisitorFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

const VisitorFilters: FC<VisitorFiltersProps> = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key: keyof FiltersState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="inline-flex items-center px-3 py-2 border border-neutral-300 shadow-sm text-sm leading-4 font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filtros
      </button>

      <select
        value={filters.period}
        onChange={(e) => handleFilterChange('period', e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
      >
        <option value="all">Todos os períodos</option>
        <option value="7">Últimos 7 dias</option>
        <option value="30">Últimos 30 dias</option>
        <option value="90">Últimos 90 dias</option>
      </select>

      <select
        value={filters.location}
        onChange={(e) => handleFilterChange('location', e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
      >
        <option value="all">Todas as cidades</option>
        <option value="Maringá">Maringá</option>
        <option value="Sarandi">Sarandi</option>
        <option value="Marialva">Marialva</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => handleFilterChange('status', e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
      >
        <option value="all">Todos os status</option>
        <option value="new">Primeira visita</option>
        <option value="return">Retorno</option>
      </select>

      <select
        value={filters.gender}
        onChange={(e) => handleFilterChange('gender', e.target.value)}
        className="block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
      >
        <option value="all">Todos os gêneros</option>
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
      </select>
    </div>
  );
};

export default VisitorFilters;