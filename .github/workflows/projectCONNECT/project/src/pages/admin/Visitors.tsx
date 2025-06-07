import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Download, UserPlus, RefreshCw, Check, MessageSquare } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import VisitorFilters from '../../components/visitors/VisitorFilters';
import VisitorColumnSelector from '../../components/visitors/VisitorColumnSelector';
import VisitorBulkActions from '../../components/visitors/VisitorBulkActions';
import VisitorDemographics from '../../components/visitors/VisitorDemographics';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Visitor {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  phone: string;
  date: string;
  stage: string;
  firstVisit: boolean;
  previousChurch?: string;
  smallGroup?: boolean;
  city: string;
  neighborhood: string;
  lastContact?: string;
  registrationDate: string;
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
  previousChurch: false,
  smallGroup: true,
};

const Visitors = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedVisitors, setSelectedVisitors] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useLocalStorage('visitorColumns', defaultColumns);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    period: 'all',
    location: 'all',
    status: 'all',
    gender: 'all',
  });
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [selectedDemographic, setSelectedDemographic] = useState<string | null>(null);

  // Mock data generation
  useEffect(() => {
    const mockVisitors: Visitor[] = Array.from({ length: 50 }, (_, i) => ({
      id: `v${i + 1}`,
      name: `Visitante ${i + 1}`,
      age: 20 + Math.floor(Math.random() * 40),
      gender: Math.random() > 0.5 ? 'M' : 'F',
      phone: `(44) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      stage: ['registered', 'callback', 'visited', 'smallgroup', 'integrated'][Math.floor(Math.random() * 5)],
      firstVisit: Math.random() > 0.7,
      previousChurch: Math.random() > 0.7 ? 'Igreja Anterior' : undefined,
      smallGroup: Math.random() > 0.6,
      city: ['Maringá', 'Sarandi', 'Marialva'][Math.floor(Math.random() * 3)],
      neighborhood: ['Centro', 'Zona 7', 'Jardim Alvorada'][Math.floor(Math.random() * 3)],
      registrationDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      lastContact: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString() : undefined,
    }));
    setVisitors(mockVisitors);
  }, []);

  // Live updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const newVisitor: Visitor = {
        id: `v${Date.now()}`,
        name: `Novo Visitante ${Math.floor(Math.random() * 100)}`,
        age: 20 + Math.floor(Math.random() * 40),
        gender: Math.random() > 0.5 ? 'M' : 'F',
        phone: `(44) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
        date: new Date().toISOString(),
        stage: 'registered',
        firstVisit: true,
        city: 'Maringá',
        neighborhood: 'Centro',
        registrationDate: new Date().toISOString(),
      };
      setVisitors(prev => [newVisitor, ...prev.slice(0, 49)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredVisitors = useMemo(() => {
    return visitors.filter(visitor => {
      if (searchTerm && !visitor.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      if (selectedDemographic) {
        if (selectedDemographic.startsWith('gender-')) {
          const gender = selectedDemographic.split('-')[1];
          if (visitor.gender !== gender) return false;
        } else if (selectedDemographic.startsWith('city-')) {
          const city = selectedDemographic.split('-')[1];
          if (visitor.city !== city) return false;
        }
      }

      if (filters.period !== 'all') {
        const days = parseInt(filters.period);
        const visitorDate = new Date(visitor.registrationDate);
        const daysAgo = (Date.now() - visitorDate.getTime()) / (1000 * 60 * 60 * 24);
        if (daysAgo > days) return false;
      }

      if (filters.location !== 'all' && visitor.city !== filters.location) {
        return false;
      }

      if (filters.status !== 'all') {
        if (filters.status === 'new' && !visitor.firstVisit) return false;
        if (filters.status === 'return' && visitor.firstVisit) return false;
      }

      if (filters.gender !== 'all' && visitor.gender !== filters.gender) {
        return false;
      }

      return true;
    });
  }, [visitors, searchTerm, filters, selectedDemographic]);

  const handleSelectAll = (checked: boolean) => {
    setSelectedVisitors(checked ? filteredVisitors.map(v => v.id) : []);
  };

  const handleSelectVisitor = (visitorId: string, checked: boolean) => {
    setSelectedVisitors(prev => 
      checked ? [...prev, visitorId] : prev.filter(id => id !== visitorId)
    );
  };

  const getVisitorBadges = (visitor: Visitor) => {
    const badges = [];
    
    const registrationDate = new Date(visitor.registrationDate);
    const daysSinceRegistration = Math.floor((Date.now() - registrationDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysSinceRegistration <= 7) {
      badges.push({
        text: 'Novo visitante',
        className: 'bg-success-100 text-success-800'
      });
    }

    if (!visitor.firstVisit && daysSinceRegistration > 60) {
      badges.push({
        text: 'Retorno',
        className: 'bg-warning-100 text-warning-800'
      });
    }

    if (visitor.smallGroup) {
      badges.push({
        text: 'Encaminhado',
        className: 'bg-primary-100 text-primary-800'
      });
    }

    return badges;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-neutral-800">Visitantes</h1>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <Plus className="h-4 w-4 mr-2" />
            Novo Visitante
          </button>
        </div>
      </div>

      {/* Demographics Charts */}
      <VisitorDemographics 
        visitors={visitors}
        onDemographicClick={setSelectedDemographic}
        selectedDemographic={selectedDemographic}
      />

      {/* Search and Filter Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar visitante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <VisitorFilters filters={filters} onFilterChange={setFilters} />
            <VisitorColumnSelector columns={visibleColumns} onChange={setVisibleColumns} />
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedVisitors.length > 0 && (
        <VisitorBulkActions
          selectedCount={selectedVisitors.length}
          onClearSelection={() => setSelectedVisitors([])}
          visitors={visitors.filter(v => selectedVisitors.includes(v.id))}
        />
      )}

      {/* Visitors Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={selectedVisitors.length === filteredVisitors.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </div>
                </th>
                {visibleColumns.timestamp && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Data/Hora
                  </th>
                )}
                {visibleColumns.name && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Visitante
                  </th>
                )}
                {visibleColumns.age && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Idade
                  </th>
                )}
                {visibleColumns.gender && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Gênero
                  </th>
                )}
                {visibleColumns.city && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Cidade
                  </th>
                )}
                {visibleColumns.neighborhood && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Bairro
                  </th>
                )}
                {visibleColumns.phone && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Telefone
                  </th>
                )}
                {visibleColumns.firstVisit && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                )}
                {visibleColumns.previousChurch && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Igreja Anterior
                  </th>
                )}
                {visibleColumns.smallGroup && (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    GC
                  </th>
                )}
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      checked={selectedVisitors.includes(visitor.id)}
                      onChange={(e) => handleSelectVisitor(visitor.id, e.target.checked)}
                    />
                  </td>
                  {visibleColumns.timestamp && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {formatDistanceToNow(new Date(visitor.registrationDate), { 
                        addSuffix: true,
                        locale: ptBR 
                      })}
                    </td>
                  )}
                  {visibleColumns.name && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                          {visitor.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">
                            <Link to={`/visitors/${visitor.id}`} className="hover:text-primary-600">
                              {visitor.name}
                            </Link>
                          </div>
                          <div className="flex gap-1 mt-1">
                            {getVisitorBadges(visitor).map((badge, index) => (
                              <span
                                key={index}
                                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badge.className}`}
                              >
                                {badge.text}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  )}
                  {visibleColumns.age && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {visitor.age} anos
                    </td>
                  )}
                  {visibleColumns.gender && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {visitor.gender === 'M' ? 'Masculino' : 'Feminino'}
                    </td>
                  )}
                  {visibleColumns.city && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {visitor.city}
                    </td>
                  )}
                  {visibleColumns.neighborhood && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {visitor.neighborhood}
                    </td>
                  )}
                  {visibleColumns.phone && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`https://wa.me/55${visitor.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary-600 hover:text-primary-900"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {visitor.phone}
                      </a>
                    </td>
                  )}
                  {visibleColumns.firstVisit && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        visitor.firstVisit ? 'bg-success-100 text-success-800' : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {visitor.firstVisit ? '1ª Visita' : 'Retorno'}
                      </span>
                    </td>
                  )}
                  {visibleColumns.previousChurch && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {visitor.previousChurch || '-'}
                    </td>
                  )}
                  {visibleColumns.smallGroup && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      {visitor.smallGroup ? (
                        <span className="inline-flex items-center text-success-600">
                          <Check className="h-4 w-4 mr-1" />
                          Sim
                        </span>
                      ) : (
                        <span className="text-neutral-500">Não</span>
                      )}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/visitors/${visitor.id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Detalhes
                    </Link>
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

export default Visitors;