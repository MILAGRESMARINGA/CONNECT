import { useState, useEffect } from 'react';
import { Search, Plus, Filter, Users, MapPin, Calendar } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icons in React Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface SmallGroup {
  id: string;
  name: string;
  leader: string;
  address: string;
  day: string;
  time: string;
  members: number;
  lat: number;
  lng: number;
}

const SmallGroups = () => {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [smallGroups, setSmallGroups] = useState<SmallGroup[]>([]);
  
  // Mock small groups data
  useEffect(() => {
    const mockGroups: SmallGroup[] = [
      {
        id: '1',
        name: 'GC Central',
        leader: 'Marcos e Juliana',
        address: 'Rua Augusta, 1500 - Consolação',
        day: 'Terça-feira',
        time: '20:00',
        members: 12,
        lat: -23.555,
        lng: -46.655,
      },
      {
        id: '2',
        name: 'GC Perdizes',
        leader: 'Rodrigo e Aline',
        address: 'Rua Cardoso de Almeida, 500 - Perdizes',
        day: 'Quarta-feira',
        time: '20:00',
        members: 8,
        lat: -23.535,
        lng: -46.675,
      },
      {
        id: '3',
        name: 'GC Vila Mariana',
        leader: 'Eduardo e Paula',
        address: 'Rua Domingos de Morais, 2000 - Vila Mariana',
        day: 'Quinta-feira',
        time: '19:30',
        members: 15,
        lat: -23.585,
        lng: -46.635,
      },
      {
        id: '4',
        name: 'GC Santana',
        leader: 'Carlos e Fernanda',
        address: 'Rua Voluntários da Pátria, 1200 - Santana',
        day: 'Segunda-feira',
        time: '20:00',
        members: 10,
        lat: -23.495,
        lng: -46.625,
      },
      {
        id: '5',
        name: 'GC Moema',
        leader: 'André e Cristina',
        address: 'Av. Moema, 500 - Moema',
        day: 'Terça-feira',
        time: '20:00',
        members: 9,
        lat: -23.595,
        lng: -46.665,
      },
      {
        id: '6',
        name: 'GC Pinheiros',
        leader: 'Rafael e Camila',
        address: 'Rua dos Pinheiros, 800 - Pinheiros',
        day: 'Quarta-feira',
        time: '19:30',
        members: 11,
        lat: -23.565,
        lng: -46.685,
      },
    ];
    
    setSmallGroups(mockGroups);
  }, []);
  
  // Filter small groups by region
  const filteredGroups = selectedRegion === 'all' 
    ? smallGroups 
    : smallGroups.filter((group) => group.address.includes(selectedRegion));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-neutral-800">Grupos Celulares</h1>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <Plus className="h-4 w-4 mr-2" />
            Novo Grupo
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar grupo ou líder..."
              className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="all">Todas as regiões</option>
              <option value="Consolação">Consolação</option>
              <option value="Perdizes">Perdizes</option>
              <option value="Vila Mariana">Vila Mariana</option>
              <option value="Santana">Santana</option>
              <option value="Moema">Moema</option>
              <option value="Pinheiros">Pinheiros</option>
            </select>
            <div className="bg-white rounded-md shadow-sm inline-flex">
              <button
                type="button"
                onClick={() => setView('list')}
                className={`px-4 py-2 text-sm font-medium ${
                  view === 'list'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-50'
                } rounded-l-md border border-neutral-300`}
              >
                <Users className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setView('map')}
                className={`px-4 py-2 text-sm font-medium ${
                  view === 'map'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-50'
                } rounded-r-md border border-neutral-300 border-l-0`}
              >
                <MapPin className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Grupo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Líder
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Endereço
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Dia/Horário
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Membros
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                          <Users className="h-4 w-4" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">{group.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {group.leader}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      {group.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-neutral-400" />
                        {group.day}, {group.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {group.members} membros
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-primary-600 hover:text-primary-900">
                        Detalhes
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Map View */}
      {view === 'map' && (
        <div className="bg-white shadow rounded-lg overflow-hidden p-4">
          <MapContainer center={[-23.55, -46.64]} zoom={12} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredGroups.map((group) => (
              <Marker key={group.id} position={[group.lat, group.lng]}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-medium text-sm">{group.name}</h3>
                    <p className="text-xs text-neutral-500">{group.address}</p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {group.day}, {group.time} • {group.members} membros
                    </p>
                    <p className="text-xs text-neutral-700 mt-1">
                      Líder: {group.leader}
                    </p>
                    <a 
                      href="#" 
                      className="mt-2 block text-xs font-medium text-primary-600 hover:text-primary-500"
                    >
                      Ver detalhes
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGroups.map((group) => (
              <div key={group.id} className="bg-neutral-50 p-3 rounded-md hover:bg-neutral-100">
                <h3 className="font-medium text-sm">{group.name}</h3>
                <p className="text-xs text-neutral-500 mt-1">{group.address}</p>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-neutral-500">
                    {group.day}, {group.time}
                  </span>
                  <span className="text-xs font-medium">
                    {group.members} membros
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmallGroups;