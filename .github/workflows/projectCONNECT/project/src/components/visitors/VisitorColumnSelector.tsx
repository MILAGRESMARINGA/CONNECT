import { FC } from 'react';
import { Columns } from 'lucide-react';

interface ColumnSelectorProps {
  columns: Record<string, boolean>;
  onChange: (columns: Record<string, boolean>) => void;
}

const VisitorColumnSelector: FC<ColumnSelectorProps> = ({ columns, onChange }) => {
  const handleColumnToggle = (columnKey: string) => {
    onChange({
      ...columns,
      [columnKey]: !columns[columnKey],
    });
  };

  const columnLabels: Record<string, string> = {
    timestamp: 'Data/Hora',
    name: 'Nome',
    age: 'Idade',
    gender: 'Gênero',
    city: 'Cidade',
    neighborhood: 'Bairro',
    phone: 'Telefone',
    firstVisit: '1ª Visita',
    previousChurch: 'Igreja Anterior',
    smallGroup: 'Grupo Celular',
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center px-3 py-2 border border-neutral-300 shadow-sm text-sm leading-4 font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <Columns className="h-4 w-4 mr-2" />
        Colunas
      </button>

      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
        <div className="py-1">
          {Object.entries(columnLabels).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
            >
              <input
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                checked={columns[key]}
                onChange={() => handleColumnToggle(key)}
              />
              <span className="ml-2">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitorColumnSelector;