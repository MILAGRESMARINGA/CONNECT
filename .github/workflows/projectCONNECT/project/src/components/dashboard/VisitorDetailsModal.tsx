import { FC } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Phone, MapPin, Calendar } from 'lucide-react';
import FilterPanel from './FilterPanel';
import ExportButton from './ExportButton';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface VisitorDetailsModalProps {
  data: {
    demographics: {
      total: number;
      growth: string;
      ageGroups: { label: string; value: number }[];
      gender: { label: string; value: number }[];
      cities: { label: string; value: number }[];
    };
    visitors: {
      timestamp: string;
      dataConsent: boolean;
      name: string;
      phone: string;
      firstVisit: boolean;
      church: string;
      age: number;
      location: string;
      zipCode: string;
    }[];
  };
}

const VisitorDetailsModal: FC<VisitorDetailsModalProps> = ({ data }) => {
  const filters = [
    {
      id: 'period',
      label: 'Período',
      options: [
        { value: '7d', label: 'Últimos 7 dias' },
        { value: '30d', label: 'Últimos 30 dias' },
        { value: '90d', label: 'Últimos 90 dias' },
        { value: 'year', label: 'Este ano' },
      ],
    },
    {
      id: 'location',
      label: 'Localização',
      options: [
        { value: 'maringa', label: 'Maringá' },
        { value: 'sarandi', label: 'Sarandi' },
        { value: 'marialva', label: 'Marialva' },
        { value: 'outros', label: 'Outras cidades' },
      ],
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        { value: 'first', label: 'Primeira visita' },
        { value: 'return', label: 'Retorno' },
        { value: 'decision', label: 'Decisão' },
      ],
    },
  ];

  const ageData = {
    labels: data.demographics.ageGroups.map(g => g.label),
    datasets: [{
      data: data.demographics.ageGroups.map(g => g.value),
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
    }],
  };

  const genderData = {
    labels: data.demographics.gender.map(g => g.label),
    datasets: [{
      data: data.demographics.gender.map(g => g.value),
      backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 99, 132, 0.8)'],
    }],
  };

  const cityData = {
    labels: data.demographics.cities.map(c => c.label),
    datasets: [{
      label: 'Visitantes por cidade',
      data: data.demographics.cities.map(c => c.value),
      backgroundColor: 'rgba(75, 192, 192, 0.8)',
    }],
  };

  const cityOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="space-y-6">
      <FilterPanel 
        filters={filters}
        onFilterChange={(filterId, value) => console.log(filterId, value)}
      />

      {/* Demographics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-medium mb-4">Faixa Etária</h4>
          <div className="h-64">
            <Pie data={ageData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-medium mb-4">Gênero</h4>
          <div className="h-64">
            <Pie data={genderData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-medium mb-4">Cidades</h4>
          <div className="h-64">
            <Bar data={cityData} options={cityOptions} />
          </div>
        </div>
      </div>

      {/* Visitors Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h4 className="text-lg font-medium">Lista de Visitantes</h4>
          <div className="space-x-2">
            <ExportButton
              data={data.visitors}
              filename="visitantes"
              type="excel"
            />
            <ExportButton
              data={data.visitors}
              filename="visitantes"
              type="pdf"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Hora
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localização
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.visitors.map((visitor, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{visitor.timestamp}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
                    <div className="text-sm text-gray-500">{visitor.age} anos</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={`https://wa.me/${visitor.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary-600 hover:text-primary-900"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      {visitor.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      visitor.firstVisit
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {visitor.firstVisit ? 'Primeira Visita' : 'Retorno'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{visitor.location}</span>
                    </div>
                    <div className="text-xs text-gray-500">{visitor.zipCode}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900">
                      Ver perfil
                    </button>
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

export default VisitorDetailsModal;