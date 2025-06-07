import { FC } from 'react';
import { Filter } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

interface FilterPanelProps {
  filters: FilterOption[];
  onFilterChange: (filterId: string, value: string) => void;
}

const FilterPanel: FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center mb-3">
        <Filter className="h-5 w-5 text-gray-400 mr-2" />
        <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filters.map((filter) => (
          <div key={filter.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {filter.label}
            </label>
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              onChange={(e) => onFilterChange(filter.id, e.target.value)}
            >
              <option value="">Todos</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;