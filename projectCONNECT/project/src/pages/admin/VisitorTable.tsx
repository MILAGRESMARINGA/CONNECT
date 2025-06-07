import { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { utils, writeFile } from 'xlsx';
import { X, MessageSquare, Eye, Filter } from 'lucide-react';
import { differenceInDays } from 'date-fns';

interface Visitor {
  data_cadastro: string;
  nome: string;
  idade: number;
  sexo: string;
  cidade: string;
  bairro: string;
  telefone: string;
  primeira_visita: boolean;
  igreja: string;
  encaminhado_gc: boolean;
}

interface VisitorProfile {
  isOpen: boolean;
  visitor: Visitor | null;
}

interface Filters {
  period: string;
  city: string;
  status: string;
}

const defaultColumns = {
  timestamp: true,
  name: true,
  age: true,
  gender: true,
  city: true,
  neighborhood: true,
  phone: true,
  firstVisit: true,
  previousChurch: true,
  referredToGC: true,
};

const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28'];

const mockData = {
  visitantes: [
    {
      data_cadastro: "2025-04-15",
      nome: "João Silva",
      idade: 28,
      sexo: "Masculino",
      cidade: "Maringá",
      bairro: "Zona 7",
      telefone: "44999887766",
      primeira_visita: true,
      igreja: "",
      encaminhado_gc: false
    },
    {
      data_cadastro: "2025-04-14",
      nome: "Maria Santos",
      idade: 35,
      sexo: "Feminino",
      cidade: "Londrina",
      bairro: "Centro",
      telefone: "44988776655",
      primeira_visita: false,
      igreja: "Igreja Esperança",
      encaminhado_gc: true
    }
  ]
};

const VisitorTable = () => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('visitorColumns');
    return saved ? JSON.parse(saved) : defaultColumns;
  });

  const [data, setData] = useState<Visitor[]>([]);
  const [filters, setFilters] = useState<Filters>({
    period: 'all',
    city: 'all',
    status: 'all'
  });
  const [profile, setProfile] = useState<VisitorProfile>({
    isOpen: false,
    visitor: null
  });

  // Load initial data and set up live updates
  useEffect(() => {
    const visitantes = mockData.visitantes || [];
    setData(visitantes);

    // Simulate live updates
    const interval = setInterval(() => {
      const newVisitor = {
        data_cadastro: new Date().toISOString(),
        nome: `Novo Visitante ${Math.floor(Math.random() * 100)}`,
        idade: 20 + Math.floor(Math.random() * 40),
        sexo: Math.random() > 0.5 ? 'Masculino' : 'Feminino',
        cidade: ['Maringá', 'Londrina', 'Sarandi'][Math.floor(Math.random() * 3)],
        bairro: ['Centro', 'Zona 7', 'Jardim'][Math.floor(Math.random() * 3)],
        telefone: `44${Math.floor(Math.random() * 90000000 + 10000000)}`,
        primeira_visita: Math.random() > 0.5,
        igreja: '',
        encaminhado_gc: false
      };
      setData(prev => [newVisitor, ...prev]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Save column preferences
  useEffect(() => {
    localStorage.setItem('visitorColumns', JSON.stringify(columns));
  }, [columns]);

  // Apply filters to data
  const filteredData = useMemo(() => {
    return data.filter(visitor => {
      // Period filter
      if (filters.period !== 'all') {
        const days = parseInt(filters.period);
        const visitDate = new Date(visitor.data_cadastro);
        const daysDiff = differenceInDays(new Date(), visitDate);
        if (daysDiff > days) return false;
      }

      // City filter
      if (filters.city !== 'all' && visitor.cidade !== filters.city) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all') {
        if (filters.status === 'first' && !visitor.primeira_visita) return false;
        if (filters.status === 'return' && visitor.primeira_visita) return false;
      }

      return true;
    });
  }, [data, filters]);

  // Memoized chart data based on filtered data
  const chartData = useMemo(() => {
    const ageGroups = ['0-18', '19-35', '36-60', '60+'];
    const getAgeGroup = (age: number) => {
      if (age <= 18) return '0-18';
      if (age <= 35) return '19-35';
      if (age <= 60) return '36-60';
      return '60+';
    };

    const ageData = ageGroups.map(group => ({
      name: group,
      value: filteredData.filter(v => getAgeGroup(v.idade) === group).length
    }));

    const genderData = [
      { name: 'Masculino', value: filteredData.filter(v => v.sexo === 'Masculino').length },
      { name: 'Feminino', value: filteredData.filter(v => v.sexo === 'Feminino').length },
    ];

    const cityCounts = filteredData.reduce((acc, v) => {
      acc[v.cidade] = (acc[v.cidade] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const cityData = Object.entries(cityCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return { ageData, genderData, cityData };
  }, [filteredData]);

  const toggleColumn = (col: string) => {
    setColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const handleProfileClick = (visitor: Visitor) => {
    setProfile({
      isOpen: true,
      visitor
    });
  };

  const closeProfile = () => {
    setProfile({
      isOpen: false,
      visitor: null
    });
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-neutral-400" />
          <h3 className="text-sm font-medium text-neutral-700">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.period}
            onChange={(e) => handleFilterChange('period', e.target.value)}
            className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="all">Todos os períodos</option>
            <option value="7">Últimos 7 dias</option>
            <option value="30">Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
            <option value="180">Últimos 180 dias</option>
          </select>

          <select
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="all">Todas as cidades</option>
            {Array.from(new Set(data.map(v => v.cidade))).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="all">Todos os status</option>
            <option value="first">Primeira visita</option>
            <option value="return">Retorno</option>
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-sm font-semibold mb-4">Distribuição por Idade</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData.ageData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
              >
                {chartData.ageData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-sm font-semibold mb-4">Distribuição por Gênero</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData.genderData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
              >
                {chartData.genderData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-sm font-semibold mb-4">Distribuição por Cidade</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData.cityData} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Column Selector */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-4">
          {Object.entries(defaultColumns).map(([key, _]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={columns[key]}
                onChange={() => toggleColumn(key)}
                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-neutral-700">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredData.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            Nenhum visitante encontrado
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  {columns.timestamp && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Data/Hora
                    </th>
                  )}
                  {columns.name && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Nome
                    </th>
                  )}
                  {columns.age && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Idade
                    </th>
                  )}
                  {columns.gender && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Sexo
                    </th>
                  )}
                  {columns.city && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Cidade
                    </th>
                  )}
                  {columns.neighborhood && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Bairro
                    </th>
                  )}
                  {columns.phone && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Telefone
                    </th>
                  )}
                  {columns.firstVisit && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      1ª Visita
                    </th>
                  )}
                  {columns.previousChurch && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Igreja
                    </th>
                  )}
                  {columns.referredToGC && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      GC
                    </th>
                  )}
                  <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredData.map((visitor, index) => (
                  <tr key={index} className="hover:bg-neutral-50">
                    {columns.timestamp && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                        {new Date(visitor.data_cadastro).toLocaleDateString('pt-BR')}
                      </td>
                    )}
                    {columns.name && (
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-neutral-900">{visitor.nome}</div>
                      </td>
                    )}
                    {columns.age && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                        {visitor.idade}
                      </td>
                    )}
                    {columns.gender && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                        {visitor.sexo}
                      </td>
                    )}
                    {columns.city && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                        {visitor.cidade}
                      </td>
                    )}
                    {columns.neighborhood && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                        {visitor.bairro}
                      </td>
                    )}
                    {columns.phone && (
                      <td className="px-4 py-3 whitespace-nowrap">
                        <a
                          href={`https://wa.me/55${visitor.telefone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary-600 hover:text-primary-700"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          WhatsApp
                        </a>
                      </td>
                    )}
                    {columns.firstVisit && (
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          visitor.primeira_visita
                            ? 'bg-success-100 text-success-800'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}>
                          {visitor.primeira_visita ? '1ª Visita' : 'Retorno'}
                        </span>
                      </td>
                    )}
                    {columns.previousChurch && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-500">
                        {visitor.igreja || '-'}
                      </td>
                    )}
                    {columns.referredToGC && (
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          visitor.encaminhado_gc
                            ? 'bg-success-100 text-success-800'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}>
                          {visitor.encaminhado_gc ? 'Sim' : 'Não'}
                        </span>
                      </td>
                    )}
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleProfileClick(visitor)}
                        className="inline-flex items-center text-primary-600 hover:text-primary-700"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver perfil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {profile.isOpen && profile.visitor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <h3 className="text-lg font-medium text-neutral-900">Perfil do Visitante</h3>
              <button
                onClick={closeProfile}
                className="text-neutral-400 hover:text-neutral-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Nome completo</h4>
                  <p className="mt-1 text-sm text-neutral-900">{profile.visitor.nome}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Idade</h4>
                  <p className="mt-1 text-sm text-neutral-900">{profile.visitor.idade} anos</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Gênero</h4>
                  <p className="mt-1 text-sm text-neutral-900">{profile.visitor.sexo}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Localização</h4>
                  <p className="mt-1 text-sm text-neutral-900">{profile.visitor.cidade} - {profile.visitor.bairro}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Telefone</h4>
                  <a
                    href={`https://wa.me/55${profile.visitor.telefone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center text-primary-600 hover:text-primary-700"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {profile.visitor.telefone}
                  </a>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Status</h4>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      profile.visitor.primeira_visita
                        ? 'bg-success-100 text-success-800'
                        : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      {profile.visitor.primeira_visita ? '1ª Visita' : 'Retorno'}
                    </span>
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Igreja anterior</h4>
                  <p className="mt-1 text-sm text-neutral-900">{profile.visitor.igreja || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-500">Encaminhado para GC</h4>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      profile.visitor.encaminhado_gc
                        ? 'bg-success-100 text-success-800'
                        : 'bg-neutral-100 text-neutral-800'
                    }`}>
                      {profile.visitor.encaminhado_gc ? 'Sim' : 'Não'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorTable;